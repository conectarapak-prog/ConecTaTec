import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Updated persona: Event Planner & Location Scout
    const response = await ai.models.generateContent({
      model: model,
      contents: message, 
      config: {
        systemInstruction: "Eres Nova, una experta planificadora de eventos y 'venue scout' para Espacios Tarapacá. Tu trabajo es ayudar a los usuarios a encontrar el lugar perfecto para bodas, conferencias, cumpleaños y reuniones corporativas. Conoces la región, entiendes de capacidades (personas), presupuestos y logística. Eres amable, entusiasta y muy organizada. Recomienda tipos de espacios basándote en el número de invitados y el tipo de evento.",
      }
    });

    return response.text || "No se pudo generar una respuesta.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Lo siento, hubo un error al procesar tu solicitud. (Detalles: ${error.message || 'Desconocido'})`;
  }
};