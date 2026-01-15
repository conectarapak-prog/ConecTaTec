import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Updated persona for Capital Raising & Manufacturing context
    const response = await ai.models.generateContent({
      model: model,
      contents: message, 
      config: {
        systemInstruction: "Eres Nova, una consultora experta en levantamiento de capital (crowdfunding/inversión), manufactura masiva y desarrollo de marca regional. Tu objetivo es ayudar a emprendedores e industriales a escalar sus proyectos, optimizar cadenas de suministro y atraer inversores. Tus respuestas son profesionales, estratégicas y centradas en la innovación industrial. Responde en español.",
      }
    });

    return response.text || "No se pudo generar una respuesta.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Lo siento, hubo un error al procesar tu solicitud. (Detalles: ${error.message || 'Desconocido'})`;
  }
};