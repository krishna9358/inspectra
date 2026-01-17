import { embed } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import {google} from "@ai-sdk/google"
import { pineconeIndex } from "@/lib/pinecone";

// const openrouter = createOpenAI({
//   apiKey: process.env.OPEN_ROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });


export async function generateEmbedding(text: string) {
  const { embedding } = await embed({
    model: google.embeddingModel("text-embedding-004"),
    value: text,
  });

  return embedding;
}



export async function indexCodebase(repoId:string, files:{path:string, content:string}[]){
    const vectors = [];

    // creating embedding and pushing to the vector created above 
    for (const file of files) {
        const content = `File: ${file.path}\n\n${file.content}`;
        const truncatedContent = content.slice(0, 8192);
        try{
            const embedding = await generateEmbedding(truncatedContent);
            vectors.push({
                id: `${repoId}-${file.path.replace(/\//g, "_")}`,
                values: embedding,
                metadata: {
                repoId,
                path: file.path,
            },
        });
    }catch(error){
        console.log("Error while generating embedding for file ==> ", file.path, error);
    }

    }

    // if some vector is already created then upsert it to the pinecone. 
    if(vectors.length > 0){
        const batchSize = 100;
        for (let i = 0; i < vectors.length; i += batchSize) {
            const batch = vectors.slice(i, i + batchSize);
            await pineconeIndex.upsert(batch)
        }
    }
}