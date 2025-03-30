/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI with the new SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System prompt that instructs the model to only provide finance-related information
const SYSTEM_PROMPT = `
You are a specialized AI financial assistant. Your responses should ONLY include information related to:
- Investment strategies and opportunities
- Financial planning and management
- Business advice and entrepreneurship
- Market analysis and economic trends
- Personal finance tips

If a question is asked that is not related to finance, investing, business, or money matters, 
politely redirect the conversation back to financial topics you can assist with.

Avoid providing specific investment advice that could be construed as financial advice requiring licensing.
Always include appropriate disclaimers when discussing investments or financial strategies.
`

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        content: "OpenAI API key not configured",
        error: "Missing API key",
      },
      { status: 500 },
    )
  }

  try {
    const body = await request.json()
    const userMessages = body.messages || []

    // Convert the messages to the format expected by OpenAI
    const formattedMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...userMessages]

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Updated to the latest model, but you can use any model you prefer
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const responseContent = completion.choices[0]?.message?.content || "Sorry, I could not generate a response."

    return NextResponse.json({ content: responseContent })
  } catch (error: any) {
    console.error(`Error with OpenAI API request: ${error.message}`)
    return NextResponse.json(
      {
        content: "An error occurred during your request.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

