$("#menu-music-button").on("click", () =>
  $("#music-modal").attr("aria-hidden", false),
);

$("#music-modal-close-button").on("click", () =>
  $("#music-modal").attr("aria-hidden", true),
);
