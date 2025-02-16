import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "../backend/src/config/.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TranslationResult {
  translatedLyrics: string;
  annotatedLyrics: string;
}

export async function translateAndAnnotateLyrics(
  lyrics: string,
  targetLang: string
): Promise<TranslationResult | undefined> {
  try {
    // Step 1: Translate the lyrics
    const translationResponse = await openai.chat.completions.create({
      model: "o1-mini",
      messages: [
        {
          role: "user",
          content: `Translate the following lyrics to ${targetLang}: ${lyrics}`,
        },
      ],
    });

    const translatedLyrics = translationResponse.choices[0].message.content;

    // Step 2: Annotate the original lyrics
    const annotationResponse = await openai.chat.completions.create({
      model: "o1-mini",
      messages: [
        {
          role: "user",
          content: `In 
          ${targetLang}, annotate the following lyrics with subjects, verbs, and objects: ${lyrics}.`,
        },
      ],
    });

    const annotatedLyrics = annotationResponse.choices[0].message.content;

    if (translatedLyrics && annotatedLyrics) {
      return { translatedLyrics, annotatedLyrics };
    } else {
      throw new Error("Translation or annotation returned null");
    }
  } catch (error) {
    console.error("Error during translation or annotation:", error);
    return undefined;
  }
}

// Example usage
// const lyrics = "Twinkle, twinkle, little star, how I wonder what you are.";
// const targetLang = "vi"; // Vietnamese language code

// translateAndAnnotateLyrics(lyrics, targetLang).then((result) => {
//   if (result) {
//     console.log("Translated Lyrics:", result.translatedLyrics);
//     console.log("Annotated Lyrics:", result.annotatedLyrics);
//   }
// });
