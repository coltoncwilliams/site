import { isSmallScreenSize } from "./utils";
import { setPortraitMinimized } from "./portrait";
import { DEFAULT_CHATS, DEFAULT_CHAT_TIME_MS } from "./constants";
import { sendChatMessage } from "./chatService";

let chatLoading = false;
let defaultChatLoading = false;
let chats = JSON.parse(localStorage.getItem("chats")) || [];
let renderedDefaultChats =
  JSON.parse(localStorage.getItem("defaultChats")) || [];

renderedDefaultChats.forEach((chatMsg) =>
  renderChat({ role: "assistent", content: chatMsg }),
);
chats.forEach((chat) => renderChat(chat));
scrollToBottom();

if (!chats.length) {
  const defaultChatsToRender = sendNextDefaultChat();
  let timeout = DEFAULT_CHAT_TIME_MS;
  defaultChatsToRender.forEach((defaultChatMsg) => {
    setTimeout(() => {
      if (!chats.length) {
        sendNextDefaultChat();
      }
    }, timeout);
    timeout = timeout + DEFAULT_CHAT_TIME_MS;
  });
}

function sendNextDefaultChat() {
  setChatLoading(false, true);
  const renderedDefaultChatsSet = new Set(renderedDefaultChats);
  const defaultChatsToRender = DEFAULT_CHATS.filter(
    (item) => !renderedDefaultChatsSet.has(item),
  );
  if (defaultChatsToRender.length) {
    renderChat({ role: "assistent", content: defaultChatsToRender[0] });
    renderedDefaultChats.push(defaultChatsToRender.shift());
    localStorage.setItem("defaultChats", JSON.stringify(renderedDefaultChats));
    if (defaultChatsToRender.length) {
      setChatLoading(true, true);
    }
    scrollToBottom();
  }
  return defaultChatsToRender;
}

function renderChat(chatObj, id, loading = false) {
  const idStr = `id="${id}"`;
  if (chatObj.role === "user") {
    $("#chat-conversation").append(
      `<div class="chat-you" ${id && idStr}><p class="header">You:</p><p class="content">${chatObj.content}</p></div>`,
    );
    return;
  }
  $("#chat-conversation").append(
    `<div class="chat-me" ${id && idStr}><p class="header">Me:</p><p class="content ${loading && "after:animate-ellipsis after:content-['.']"}">${chatObj.content}</p></div>`,
  );
}

async function sendChat(chatMsg) {
  if (defaultChatLoading) {
    setChatLoading(false, true);
  }
  const chatObj = { role: "user", content: chatMsg };
  renderChat(chatObj, "chat-temp-div");
  setChatLoading(true);

  scrollToBottom();

  const result = await sendChatMessage([...chats, chatObj]);
  if (result.success) {
    return onChatSendSuccess(chatObj, result.response);
  }
  onChatSendFail(chatObj, result.errorMsg);
}

function onChatSendSuccess(sentChatObj, receivedChatObj) {
  chats.push(sentChatObj);
  chats.push(receivedChatObj);
  localStorage.setItem("chats", JSON.stringify(chats));
  $("#chat-temp-div").removeAttr("id");
  renderChat(receivedChatObj);
  setChatLoading(false);
}

function onChatSendFail(sentChatObj, errorMsg) {
  $("#chat-temp-div").remove();
  $("#chat-input").val(sentChatObj.content);
  setChatLoading(false);
  setError(errorMsg);
}

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

function setChatLoading(loading, defaultChat = false) {
  if (defaultChat) {
    defaultChatLoading = loading;
  } else {
    chatLoading = loading;
    $("#chat-submit").attr("aria-disabled", loading);
  }

  if (loading) {
    return renderChat(
      { role: "assitent", content: "" },
      "chat-loading-div",
      true,
    );
  }
  $("#chat-loading-div").remove();
}

function setError(errorMsg) {
  $("#chat-submit").prop("disabled", true);
  $("#chat-input").prop("disabled", true);
  $("#chat-error-message").text(errorMsg);
  $("#chat").attr("aria-errormessage", true);
}

function removeError() {
  $("#chat-submit").prop("disabled", false);
  $("#chat-input").prop("disabled", false);
  $("#chat").attr("aria-errormessage", false);
}

$("#chat").on("click", clickChat);

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

$("#chat-form").on("submit", function (e) {
  e.preventDefault();
  const chat = $("#chat-input").val();
  if (!chat || chatLoading) {
    return;
  }
  $("#chat-input").val("");
  sendChat(chat);
});

$("#chat-button-clear").on("click", () => {
  chats = [];
  localStorage.setItem("chats", JSON.stringify(chats));
  $("#chat-conversation").empty();
  renderedDefaultChats.forEach((chatMsg) =>
    renderChat({ role: "assistent", content: chatMsg }),
  );
  scrollToBottom();
});

$("#chat-button-error").on("click", removeError);

$("#chat-e").on("click", () => setError("Something went wrong"));

function scrollToBottom() {
  $("#chat-conversation").animate(
    {
      scrollTop: $("#chat-conversation")[0].scrollHeight,
    },
    300,
  );
}
