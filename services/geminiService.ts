import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Create a chat session with the provided history
    const chat = ai.chats.create({
      model: model,
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      })),
      config: {
        systemInstruction: `Eres ConecTATE, la asistente virtual premium de EspaciosNova. Tu misión es actuar como una "Event Planner" experta y completa para la región de Tarapacá.
        
        Tus objetivos son:
        1. **Planificación Temporal**: Crear cronogramas detallados (minuto a minuto) para bodas, seminarios o cumpleaños.
        2. **Asesoría Integral**: Recomendar sobre catering, audio, iluminación, decoración y logística (estacionamiento, accesos).
        3. **Gestión de Espacios**: Sugerir cómo optimizar el layout del salón elegido (pista de baile, mesas, escenario).
        4. **Presupuesto**: Ayudar a estimar costos y priorizar gastos.
        
        Tono: Profesional, cálido, muy organizado y proactivo. Usa emojis para dar vida a la conversación.
        Estructura tus respuestas con viñetas claras o pasos numerados cuando des un plan.
        
        Si el usuario menciona un espacio específico (como "Gran Salón Tarapacá"), asume que conoces sus características (vista al mar, capacidad, etc.).`,
      }
    });

    const response = await chat.sendMessage({ message: message });

    return response.text || "No se pudo generar una respuesta.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Lo siento, hubo un error al procesar tu solicitud. (Detalles: ${error.message || 'Desconocido'})`;
  }
};