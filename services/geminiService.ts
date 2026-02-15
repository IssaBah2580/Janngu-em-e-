import { GoogleGenAI, Modality } from "@google/genai";

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const byteLength = data.byteLength;
  // Use buffer.slice to ensure we have a clean ArrayBuffer that can be interpreted as Int16 without alignment issues
  const bufferToDecode = data.buffer.slice(data.byteOffset, data.byteOffset + byteLength);
  const dataInt16 = new Int16Array(bufferToDecode, 0, Math.floor(byteLength / 2));
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Generates speech for a given text using Gemini TTS.
 * @param text The text to speak.
 * @param lang Hint for the model to use the correct accent (e.g., 'French', 'English', 'Pulaar').
 * @param slow Whether to speak slowly.
 */
export const speakText = async (text: string, lang: string = 'Pulaar', slow: boolean = false) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key is missing in process.env.API_KEY");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Act as a native speaker of ${lang}. Say the following text ${slow ? 'slowly and clearly' : 'naturally'}: ${text}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.error("Browser does not support AudioContext");
      return null;
    }

    const audioContext = new AudioContextClass({ sampleRate: 24000 });
    const decodedBytes = decode(base64Audio);
    const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    
    return source;
  } catch (error) {
    console.error("TTS Generation Failed:", error);
    return null;
  }
};