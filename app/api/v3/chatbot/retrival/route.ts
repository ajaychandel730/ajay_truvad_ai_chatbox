import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb_client";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import GeminiModel from "@/lib/AIFeatures/langchain/GeminiModel";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    if (!query) {
      return NextResponse.json(
        { status: "failed", message: "Bad request." },
        { status: 400 },
      );
    }

    const collection = (await clientPromise)
      .db("truvad")
      .collection("regulatory");

    // embadding and vectorstore
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-2",
    });

    const dbConfig = {
      collection: collection,
      indexName: "regulatory_vector", // The name of the MongoDB Search index to use.
      textKey: "text", // Field name for the raw text content. Defaults to "text".
      embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
    };

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, dbConfig);

    const documents = await vectorStore.similaritySearch(query, 4);

    const context = documents
      .map((doc, index) => {
        return `Source ${index + 1}:
               ${doc.pageContent}`;
      })
      .join("\n\n");

    const prompt = ChatPromptTemplate.fromTemplate(`
     You are an assistant for question-answering tasks.

     Use the following pieces of retrieved context to answer the question.

     If you don't know the answer, just say that you don't know.

     Use three sentences maximum and keep the answer concise.

     Question:
     {question}

     Context:
     {context}

     Answer:
     `);

    const llm = await GeminiModel();

    const message = await prompt.invoke({ question: query, context });

    const stream = await llm.stream(message);

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (typeof chunk.content === "string") {
            controller.enqueue(encoder.encode(chunk.content));
          }
        }

        controller.close();
      },
    });

    // --------------------------------
    // 4. Send stream to browser
    // --------------------------------

    return new NextResponse(readableStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
    
  } catch (err) {
    console.log("error:", err);
    return NextResponse.json({ status: "error", error: err }, { status: 500 });
  }
}
