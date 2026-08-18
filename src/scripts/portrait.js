$("#portrait-minimize-button").on("click", clickPortraitMinimize);
$("#portrait-maximize-button").on("click", clickPortraitMaximize);
$("#portrait-close-button").on("click", clickPortraitClose);
$("#portrait").on("click", playBackgroundVideo);

let portraitMaximized = false;
let portraitMinimized = false;

export function setPortraitMinimized() {
  portraitMinimized = true;
}

function clickPortraitMaximize() {
  portraitMaximized = !portraitMaximized;
  $("#portrait").attr("aria-hidden", false);
  $("#portrait").attr("aria-expanded", portraitMaximized);
}

function clickPortraitMinimize() {
  portraitMinimized = !portraitMinimized;
  $("#portrait").attr("aria-expanded", false);
  $("#portrait").attr("aria-hidden", portraitMinimized);
}

function clickPortraitClose() {
  $("#portrait").attr("aria-expanded", false);
  $("#portrait").attr("aria-hidden", false);
  $("#portrait").attr("aria-disabled", true);
}

function playBackgroundVideo() {
  $("#portrait-background-video").trigger("play");
  $("#portrait-background-video").get(0).play();
}
