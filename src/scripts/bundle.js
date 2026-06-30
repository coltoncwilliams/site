(() => {
  // js/menu.js
  var openMenuItemID = void 0;
  $("#menu-file-button").on("click", () => clickMenuItem("menu-file"));
  $("#menu-file-button").on("mouseenter", () => hoverMenuItem("menu-file"));
  $("#menu-edit-button").on("click", () => clickMenuItem("menu-edit"));
  $("#menu-edit-button").on("mouseenter", () => hoverMenuItem("menu-edit"));
  function clickMenuItem(id) {
    if (openMenuItemID) {
      return;
    }
    $(`#${id}`).attr("aria-expanded", true);
    openMenuItemID = id;
    function handleMenuEscape(event) {
      if (event.key === "Escape" || event.type === "click") {
        closeMenu();
        document.removeEventListener("click", handleMenuEscape);
        document.removeEventListener("keydown", handleMenuEscape);
      }
    }
    setTimeout(() => {
      document.addEventListener("click", handleMenuEscape);
      document.addEventListener("keydown", handleMenuEscape);
    }, 0);
  }
  function hoverMenuItem(id) {
    if (openMenuItemID) {
      $(`#${openMenuItemID}`).attr("aria-expanded", false);
      openMenuItemID = id;
      $(`#${openMenuItemID}`).attr("aria-expanded", true);
    }
  }
  function closeMenu() {
    if (openMenuItemID) {
      $(`#${openMenuItemID}`).attr("aria-expanded", false);
    }
    openMenuItemID = void 0;
  }

  // js/portrait.js
  $("#portrait-minimize-button").on("click", clickPortraitMinimize);
  $("#portrait-maximize-button").on("click", clickPortraitMaximize);
  $("#portrait-close-button").on("click", clickPortraitClose);
  var portraitMaximized = false;
  var portraitMinimized2 = false;
  function clickPortraitMaximize() {
    portraitMaximized = !portraitMaximized;
    $("#portrait").attr("aria-hidden", false);
    $("#portrait").attr("aria-expanded", portraitMaximized);
  }
  function clickPortraitMinimize() {
    portraitMinimized2 = !portraitMinimized2;
    $("#portrait").attr("aria-expanded", false);
    $("#portrait").attr("aria-hidden", portraitMinimized2);
  }
  function clickPortraitClose() {
    $("#portrait").attr("aria-expanded", false);
    $("#portrait").attr("aria-hidden", false);
    $("#portrait").attr("aria-disabled", true);
  }

  // js/utils.js
  function isSmallScreenSize() {
    const SCREEN_SIZE_SM_PX = 640;
    return window.innerWidth <= SCREEN_SIZE_SM_PX;
  }

  // js/chat.js
  $("#chat").on("click", clickChat);
  var yourChats = [];
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
        window.scrollTo(0, 0);
      }
    }, 500);
  });

  // js/body.js
  $("#body-content-1-button").on("click", () => clickBodyTab("body-content-1"));
  $("#body-content-2-button").on("click", () => clickBodyTab("body-content-2"));
  $("#body-content-3-button").on("click", () => clickBodyTab("body-content-3"));
  function clickBodyTab(id) {
    const bodyContentIds = [
      "body-content-1",
      "body-content-2",
      "body-content-3",
    ];
    bodyContentIds.forEach((bodyId) => {
      if (id === bodyId) {
        $(`#${id}`).attr("aria-expanded", true);
      } else {
        $(`#${bodyId}`).attr("aria-expanded", false);
      }
    });
  }

  // js/music.js
  $("#menu-music-button").on("click", () =>
    $("#music-modal").attr("aria-hidden", false),
  );
})();
