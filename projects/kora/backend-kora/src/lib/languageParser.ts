import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ParsedEvent {
  title: string;
  date: Date;
  guest: string;
}

export async function parseNaturalLanguageEvent(input: string): Promise<ParsedEvent> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Extract event details (title and date) from user input. Return the response in JSON format: { \"title\": \"event title\", \"date\": \"YYYY-MM-DD\" }.",
        },
        {
          role: "user",
          content: `Extract the event details from: "${input}"`,
        },
      ],
    });

    const aiResponse = response.choices[0]?.message?.content;
    if (!aiResponse) return { title: input, date: new Date(), guest: "" };

    const parsedData: { title?: string; date?: string, guest?: string } = JSON.parse(aiResponse);

    return {
      title: parsedData.title || input,
      date: parsedData.date ? new Date(parsedData.date) : new Date(),
      guest: parsedData.guest || input
    };
  } catch (error) {
    console.error("Error parsing event:", error);
    return { title: input, date: new Date(), guest: "" };
  }
}