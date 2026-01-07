import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const apiUrl = import.meta.env.VITE_API_KEY;


export async function aiCall(inputValue) {
  const genAI = new GoogleGenerativeAI(apiUrl);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `create multiple todos task for this text -->${inputValue}. don't include time , status just return serially like 1."xyz" note:dont add any extra thing just return 1."xyz"`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  let task = parseTextToArray(text);
  console.log(aiResult);
  return task;
}
const parseTextToArray = (text) => {
  return text.split("\n").map((item) => item.replace(/^\d+\.\s*"|"$/g, ""));
};



export async function getAIresult(arrofexpenses) {
    const genAI = new GoogleGenerativeAI(apiUrl);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${arrofexpenses}. calculate total spending give responce in json   `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    
  }