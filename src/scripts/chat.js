import { isSmallScreenSize } from "./utils";
import { setPortraitMinimized } from "./portrait";

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

  if ($(window).height() > $("#header-content").height()) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
}

function sendChat(chat) {
  yourChats.push(chat);
  $("#chat-conversation").append(
    `<div class="chat-you"><p class="header">You:</p><p class="content">${chat}</p></div>`,
  );
}

$("#chat").on("focusin", function () {
  if (isSmallScreenSize()) {
    setPortraitMinimized();
    $("#portrait").attr("aria-disabled", false);
    $("#portrait").attr("aria-hidden", true);
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
      window.scrollTo(0, 0);
    }
  }, 500);
});
