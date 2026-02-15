
import { GoogleGenAI } from "@google/genai";
import { Attendee } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMusicalReflection = async (attendees: Attendee[]): Promise<string> => {
  const musiciansCount = attendees.filter(a => a.role === 'Músico (Irmão)').length;
  const organistsCount = attendees.filter(a => a.role === 'Organista (Irmã)').length;

  const prompt = `
    Você é um assistente especializado em eventos musicais sacros. 
    Temos atualmente ${musiciansCount} músicos (irmãos) e ${organistsCount} organistas (irmãs) registrados no evento.
    
    Por favor, gere uma breve mensagem de encorajamento (máximo 3 parágrafos) para este grupo de músicos e organistas. 
    Use um tom respeitoso, solene e inspirador. Mencione a importância da harmonia e do louvor.
    A mensagem deve ser em Português do Brasil.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Desejamos a todos um excelente ensaio e louvor!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Que a música deste evento traga paz e harmonia a todos os corações.";
  }
};
