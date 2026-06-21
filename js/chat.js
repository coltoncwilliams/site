import { isSmallScreenSize } from "./utils";

$("#chat").on("click", clickChat);

const yourChats = [];

$("#chat-form").on("submit", function (e) {
  e.preventDefault();
  const chat = $("#chat-input").val();
  if (!chat) {
    return;
  }
  $("#chat-input").val("");
  $("#chat-conversation").animate(
    {
      scrollTop: $("#chat-conversation")[0].scrollHeight,
    },
    300,
  );
  sendChat(chat);
});

function clickChat() {
  $("#chat-input").focus();
}

function sendChat(chat) {
  yourChats.push(chat);
  $("#chat-conversation").append(
    `<div class="chat-you"><p class="header">You:</p><p class="content">${chat}</p></div>`,
  );
}

$("#chat").on("focusin", function () {
  if (isSmallScreenSize()) {
    portraitMinimized = true;
    $("#portrait").attr("aria-disabled", false);
    $("#portrait").attr("aria-hidden", portraitMinimized);
    $("#header-content").height("20rem");
  }
});

$("#chat").on("focusout", function (e) {
  setTimeout(() => {
    if (
      !$("#chat").is(":focus") &&
      !$("#chat").has(document.activeElement).length &&
      isSmallScreenSize()
    ) {
      $("#portrait").attr("aria-disabled", false);
      $("#portrait").attr("aria-hidden", false);
      $("#header-content").height("");
    }
  }, 500);
});
