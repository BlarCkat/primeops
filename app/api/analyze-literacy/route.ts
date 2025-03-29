// app/api/analyze-literacy/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { responses } = await request.json();

    // Prepare the prompt for OpenAI
    const prompt = `
      Based on a user's responses to a financial literacy assessment, determine their financial literacy level (beginner, intermediate, or expert).
      
      User's responses:
      1. At the end of every month, how much income is usually left?
         Answer: "${responses.monthlyRemaining}"
      
      2. If they received GHS 1,000 today, what would they do first?
         Answer: "${responses.windfall}"
      
      3. When needing to borrow money, what option do they think is best?
         Answer: "${responses.borrowing}"
      
      4. When receiving an SMS about winning a lottery they never played, what would they do?
         Answer: "${responses.scamAwareness}"

      5. Have they ever recommended a financial product to one of their friends?
         Answer: "${responses.scamAwareness}"
      
      Please analyze these responses and provide only one of these three levels as your response: "beginner", "intermediate", or "expert".
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a financial literacy assessment tool. Analyze the user's responses to determine their financial literacy level. Return only 'beginner', 'intermediate', or 'expert'." 
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 50,
      temperature: 0.3, // Lower temperature for more consistent results
    });

    // Extract and sanitize the response
    let literacyLevel = completion.choices[0].message.content?.trim().toLowerCase() || 'intermediate';
    
    // Ensure we only get one of the three expected values
    if (!['beginner', 'intermediate', 'expert'].includes(literacyLevel)) {
      // Default to intermediate if the response is unexpected
      literacyLevel = 'intermediate';
    }

    return NextResponse.json({ literacyLevel });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json(
      { error: 'Failed to analyze literacy level' },
      { status: 500 }
    );
  }
}