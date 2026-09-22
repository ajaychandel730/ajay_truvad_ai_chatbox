"use server";
import { googleGeminiAi } from "@/lib/AIFeatures/GeminiAPI";
import { getAiRegulatorPrompt } from "@/lib/AIFeatures/getAiRegulatorPrompt";
import { regulatorAccessmentJSONSchema } from "@/lib/zodDefinations/regulatorAccessmentSchema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    if (!query) {
      return NextResponse.json(
        { status: "failed", message: "Please provide query." },
        { status: 400 },
      );
    }

    const prompt = await getAiRegulatorPrompt(query);

    const gemini = await googleGeminiAi(prompt, {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(regulatorAccessmentJSONSchema),
    });

    const result = regulatorAccessmentJSONSchema.safeParse(
      JSON.parse(gemini.output_text as string),
    );

    if (!result.success) {
      return NextResponse.json(
        { status: "error", message: "Something went wrong Please try later." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        result: {
          ...result.data,
          id: crypto.randomUUID(),
          created_at: Date.now().toString(),
        },
      },
      { status: 200 },
    );
  } catch (err) {
    let message = "Something went wrong. Please try later.";

    if (err && typeof err == "object" && "message" in err) {
      message = err.message as string;
    }
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
