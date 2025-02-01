// import OpenAI from "openai";
// const fs = require("fs");
// require('dotenv').config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const myAssistant = await openai.beta.assistants.create({
//     model: "gpt-4o-mini",
//     instructions:
//       "You are a teacher assistant chatbot. Use your knowledge base to best respond to students' and teachers' queries.",//Maybe work on prompt later
//     name: "TAI Chatbot",
//     tools: [{ type: "retrieval" }],
// });

// const thread = await openai.beta.threads.create();
// console.log("This is the thread object: ", thread, "\n");

// async function PrepFiles(filePath, purpose="assistants") {
//     const file = await openai.files.create({
//         file: fs.createReadStream(filePath),
//         purpose: purpose,
//     });

//     return file.id;
// }

// async function MakeThreadMessage(content, fileId) {
//     return await openai.beta.threads.messages.create(
//         (threadId = thread.id),
//         {
//           role: "user",
//           content: content,
//           file_ids: fileId,
//         }
//     );
// }

// async function MakePromptReq() {
//     return await openai.beta.threads.runs.create(
//         (thread_id = myThread.id),
//         {
//           assistant_id: myAssistant.id,
//           instructions: "Please address the user as Rok Benko.",
//         }
//       );
// }
// //const openAiRuntime = 


// export default {myAssistant, thread, PrepFiles, MakeOpenAiPrompt}