import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export const enhancePrompt = async (userPrompt: string, count: number, shotType: string, apiKey: string): Promise<string[]> => {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("Google Gemini API Key is required.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  if (!userPrompt.trim()) {
    return ["Please provide an idea to enhance."];
  }
  
  const shotTypeInstruction = shotType && shotType.trim() !== ''
    ? `For each variation, the camera composition must be a **${shotType}**. Emphasize this perspective in the description.`
    : `For each variation, choose a dynamic and interesting camera composition (e.g., close-up, wide shot, dutch angle) that best fits the scene.`;


  const metaPrompt = `You are an expert prompt engineer for advanced text-to-image AI models like Imagen. Your task is to take a user's simple idea and expand it into ${count} distinct, cohesive, and highly descriptive prompt variations. Each prompt should be a single paragraph, rich in detail, using vivid adjectives and evocative language to describe the subject, its actions, the setting, art style, lighting, and colors. ${shotTypeInstruction} Focus on creating visually stunning and unique scenes for each variation. Return the output as a JSON object with a single key "prompts" which is an array of strings. Do not add any other text, labels, or explanations.

User's idea: "${userPrompt}"`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: metaPrompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompts: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'A single, detailed and creative image prompt.'
              },
              description: 'An array of generated image prompt variations.'
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text);
    return result.prompts || [];
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    // Let the calling function handle the UI state for the error.
    throw error;
  }
};