import {Pinecone} from "@pinecone-database/pinecone"

export const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });


export const pineconeIndex = pinecone.index("inspectra-vector-embeddings-v1")

