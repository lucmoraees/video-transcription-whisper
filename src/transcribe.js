import { pipeline } from "@xenova/transformers";
import { loadingMessage } from "./loading";
// import data from "./data.json";

let data = null;

export async function transcribeAudio() {
  try {
    const options = {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
      return_timestamps: true,
    };

    console.time();

    loadingMessage(
      "Iniciando a transcrição de áudio, essa etapa é bem demorada... Aguarde!"
    );

    console.log("[START_TRANSCRIBE]");

    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    );

    data = await transcriber("../audio.mp3", options);
  } catch (error) {
    console.log("[ERROR_TRANSCRIBE]");
    throw new Error(error);
  } finally {
    console.timeEnd();
    loadingMessage("Transcrição de áudio finalizada!");
    console.log("[STOP_TRANSCRIBE]");
    return data;
  }
}
