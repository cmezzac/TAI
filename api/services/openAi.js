import OpenAI from "openai";
import fs from "fs";
import dotenv from 'dotenv';
import VectorStoreId from "../schemas/VectorStore.js"
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const GetVectorStore = async (feature) => {
  try {
    const vectorStoreDoc = await VectorStoreId.findOne({ feature });

    if (!vectorStoreDoc) {
      throw new Error(`VectorStore for feature "${feature}" not found.`);
    }

    return await openai.beta.vectorStores.retrieve(vectorStoreDoc.storeId);

  } catch (error) {
    console.error('Error initializing Vector Store:', error);
    throw error;  // Re-throw to let the caller handle it if needed
  }
};



async function initOpenAi(vectorStoreId) {
  const AiInstructions = "You are a teacher assistant chatbot. Use your knowledge base to respond to queries. You can also use your pre-existsing insight and knowledge to help students with questions";

  const assistant = await openai.beta.assistants.create({
    name: 'TAI Chatbot',
    model: 'gpt-4o-mini',
    instructions: AiInstructions,
    tools: [{ type: 'file_search' }],
    tool_resources: {
        file_search: {
            vector_store_ids: [vectorStoreId]
        }
    }
});

  const thread = await openai.beta.threads.create();
  console.log("This is the thread object: ", thread, "\n");

  return {assistant, thread};
}

async function getSimplePromptResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // You can use "gpt-4", "gpt-4o", or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful assistant. Give me a 50 word max response" },  // Optional system message
        { role: "user", content: prompt },                           // User prompt
      ],
    });


    const assistantReply = response.choices[0].message.content;
    return assistantReply;
  } catch (error) {
    console.error("Error getting response from OpenAI:", error.message);
    throw error;
  }
}

async function prepTxtFiles(filePath, purpose="assistants") {
  const file = await openai.files.create({
      file: fs.createReadStream("test.txt"),
      purpose: purpose,
  });

  console.log('File Uploaded:', file);
  return file.id;
}

async function prepFiles(fileBuffer, purpose="assistants") {
  const file = await openai.files.create({
      file: fileBuffer,
      purpose: purpose,
  });

  console.log('File Uploaded:', file);
  return file.id;
}

async function makeThreadMessage(threadId) {
    return await openai.beta.threads.messages.create(
        (threadId = threadId),
        {
          role: "user",
          content: "",
        }
    );
}

async function makePromptReq(assistantId, threadId, prompt) {
    return await openai.beta.threads.runs.create(
        (threadId = threadId),
        {
          assistant_id: assistantId,
          instructions: prompt,
        }
      );
}


async function getOrCreateVectorStore() {
  const vectorStores = await openai.beta.vectorStores.list();
  console.log('Vector Stores:', vectorStores);
  return (vectorStores.data.length === 0) ? await openai.beta.vectorStores.create({ name: 'TAi_Vector_Store' })
                                          : await openai.beta.vectorStores.retrieve(vectorStores.data[0].id);
}

async function addFileToVectorStoreFiles(vectorStoreId, fileId) {
  await openai.beta.vectorStores.files.create(vectorStoreId, {
    file_id: fileId
  });
  const files = await openai.beta.vectorStores.files.list(vectorStoreId);
}

async function updateVectorStoreFileIds(vectorStoreId, newFileIds) {
  try {
      // Update the vector store with new file IDs
      const response = await openai.beta.vectorStores.update(vectorStoreId, {
          file_ids: newFileIds
      });

      console.log('Vector Store Updated:', response);
  } catch (error) {
      console.error('Error updating vector store:', error);
  }
}

async function getRunStatus(threadId, runId) {
  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  return runStatus.status;
}

async function waitForRunCompletion(threadId, runId) {
  let status = await getRunStatus(threadId, runId);
  
  while (status !== 'completed' && status !== 'failed' && status !== 'cancelled') {
      console.log(`Current run status: ${status}`);
      await new Promise(resolve => setTimeout(resolve, 2000));  // Wait 2 seconds before polling again
      status = await getRunStatus(threadId, runId);
  }
  
  if (status === 'completed') {
      console.log('Run completed!');
      return true;
  } else {
      console.error(`Run ended with status: ${status}`);
      return false;
  }
}

async function getAssistantResponse(threadId) {
  const messages = await openai.beta.threads.messages.list(threadId);
  
  const assistantMessage = messages.data.find(msg => msg.role === 'assistant');
  
  if (assistantMessage) {
      console.log('Assistant Response:', assistantMessage.content[0].text.value);
  } else {
      console.log('No assistant response found yet.');
  }
}

async function PromptRequestAndResponseAsync(assistanceId=assistant.id, threadId=thread.id, prompt) {
  const promptRequest = await makePromptReq(assistanceId, threadId, prompt);
  
  (async () => {
    const runCompleted = await waitForRunCompletion(threadId, promptRequest.id);
    
    if (runCompleted) {
      console.log("inside 3");
        return await getAssistantResponse(threadId);
    }
  })();
}

export default {initOpenAi, getOrCreateVectorStore, updateVectorStoreFileIds, addFileToVectorStoreFiles, prepFiles, makeThreadMessage, PromptRequestAndResponseAsync, prepTxtFiles,getSimplePromptResponse}

