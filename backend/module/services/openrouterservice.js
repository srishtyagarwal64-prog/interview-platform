import axios from "axios";

export const askAi=async(messages)=>{
try{
if (!Array.isArray(messages) || messages.length === 0) 
    {
      throw new Error("Messages array is empty.");
    }
const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
    {
    model: "openai/gpt-4o-mini",
        messages,
    },
{
     headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
}
);
const content =  response?.data?.choices?.[0]?.message?.content;
 if (!content || !String(content).trim()) {
      throw new Error("AI returned empty response.");
    }
return content.trim();
}
catch(error){
 console.error("OpenRouter Error:", error?.response?.data || error.message);
 throw new Error("open router api error");

}
}