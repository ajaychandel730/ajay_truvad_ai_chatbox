import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb_client";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("url");

    if (!query) {
      return NextResponse.json(
        { status: "failed", message: "Bad request." },
        { status: 400 },
      );
    }

    const collection = (await clientPromise)
      .db("truvad")
      .collection("regulatory");

    const dbConfig = {
      collection: collection,
      indexName: "regulatory_vector", // The name of the MongoDB Search index to use.
      textKey: "text", // Field name for the raw text content. Defaults to "text".
      embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
    };

    // load important information
    const loader = new CheerioWebBaseLoader(query);

    const docs = await loader.load();

    // spilit  this information into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ["\n\n", "\n", " ", ""],
    });

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-2",
    });

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, dbConfig);

    const chunks = await splitter.splitDocuments(docs);
    
     chunks.forEach((chunk)=> {
      chunk.metadata.created_at = new Date();
     })

    const result = await vectorStore.addDocuments(chunks);

    return NextResponse.json(
      { status: "ok", documentAdded: result.length },
      { status: 200 },
    );
  } catch (err) {

    console.error("bot ingest pipeline error:", err);
    return NextResponse.json({ status: "error", error: err }, { status: 500 });

  }
}
