import OpenAI from "openai";
const fs = require("fs");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const myAssistant = await openai.beta.assistants.create({
    model: "gpt-4o-mini",
    instructions:
      "You are a teacher assistant chatbot. Use your knowledge base to best respond to students' and teachers' queries.",//Maybe work on prompt later
    name: "TAI Chatbot",
    tools: [{ type: "retrieval" }],
});

const thread = await openai.beta.threads.create();
console.log("This is the thread object: ", thread, "\n");

async function PrepFiles(filePath, purpose="assistants") {
    const file = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: purpose,
    });
}

async function MakeOpenAiPrompt(promptMsg) {
    await openai.beta.threads.messages.create(
        (thread_id = thread.id),
        {
          role: "user",
          content: promptMsg,
          file_ids: [file.id],
        }
    );
}

async function AddToOpenaiThread(file) {
    await openai.beta.threads.messages.create(
        (thread_id = thread.id),
        {
          role: "user",
          content: "What can I buy in your online store?",
          file_ids: [file.id],
        }
      );
}

//const openAiRuntime = 


//export default {myAssistant, thread, PrepFiles, MakeOpenAiPrompt}