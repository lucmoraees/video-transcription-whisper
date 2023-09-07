import { loadingMessage } from "./loading";

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null;

export function getVideoId(url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
}

export function loadingVideo(url) {
  loadingMessage("Carregando vídeo");

  return new Promise((resolve, reject) => {
    window.YTPlayer = new YT.Player("youtubeVideo", {
      videoId: getVideoId(url),
      events: {
        onReady: () => resolve(),
      },
    });
  });
}
