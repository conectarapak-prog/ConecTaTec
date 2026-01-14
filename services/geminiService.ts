import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // For a simple chat experience, we can use generateContent with system instructions
    // regarding the persona.
    const response = await ai.models.generateContent({
      model: model,
      contents: message, // In a full implementation, we would pass history here properly formatted
      config: {
        systemInstruction: "Eres Nova, un asistente de plataforma inteligente, profesional y conciso. Ayudas a los usuarios a entender sus datos y gestionar la plataforma. Responde en español.",
      }
    });

    return response.text || "No se pudo generar una respuesta.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Lo siento, hubo un error al procesar tu solicitud. (Detalles: ${error.message || 'Desconocido'})`;
  }
};