import ytdl from "ytdl-core";
import fs from "fs";

export const downloader = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`;
    console.log("[START_DOWNLOAD]: ", videoUrl);

    ytdl(videoUrl, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      .on("end", () => {
        console.log("[END_DOWNLOAD]");
        resolve();
      })
      .on("error", (error) => {
        console.error("[DOWNLOAD_ERROR]: ");
        reject("Erro ao baixar o vídeo");
      })
      .pipe(fs.createWriteStream("audio.mp4"));
  });
