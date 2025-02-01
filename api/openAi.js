import OpenAI from "openai";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function initOpenAi(vectorStoreId) {
  const assistant = await openai.beta.assistants.create({
    name: 'TAI Chatbot',
    model: 'gpt-4o-mini',
    instructions: "You are a teacher assistant chatbot. Use your knowledge base to respond to queries.",
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


async function prepFiles(filePath, purpose="assistants") {
    const file = await openai.files.create({
        file: fs.createReadStream("test.txt"),
        purpose: purpose,
    });

    console.log('File Uploaded:', file);
    return file.id;
}

async function makeThreadMessage(content, threadId) {
    return await openai.beta.threads.messages.create(
        (threadId = threadId),
        {
          role: "user",
          content: content,
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

async function getRunStatus(threadId, runId) {
  return await openai.beta.threads.runs.retrieve(threadId, runId);
}


async function getOrCreateVectorStore() {
  const vectorStores = await openai.beta.vectorStores.list();
  console.log('Vector Stores:', vectorStores);
  return (vectorStores.data.length === 0) ? await openai.beta.vectorStores.create({ name: 'TAI_Vector_Store' })
                                          : await openai.beta.vectorStores.retrieve(vectorStores[0]);
}

async function addFileToVectorStoreFiles(vectorStoreId, fileId) {
  await openai.beta.vectorStores.files.create(vectorStoreId, {
    file_id: fileId
  });
  const files = await openai.beta.vectorStores.files.list(vectorStore.id);
  console.log('Files in Vector Store:', files);
}

export default {initOpenAi, getOrCreateVectorStore, addFileToVectorStoreFiles, prepFiles, makeThreadMessage, makePromptReq, getRunStatus}