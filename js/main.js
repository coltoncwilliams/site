const SCREEN_SIZE_SM_PX = 640;

/**
 * MENU
 */

let openMenuItemID = undefined;

function clickMenuItem(id) {
  if (openMenuItemID) {
    return;
  }
  document.getElementById(id).setAttribute("aria-expanded", true);
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
    document
      .getElementById(openMenuItemID)
      .setAttribute("aria-expanded", false);
    openMenuItemID = id;
    document.getElementById(openMenuItemID).setAttribute("aria-expanded", true);
  }
}

function closeMenu() {
  if (openMenuItemID) {
    document
      .getElementById(openMenuItemID)
      .setAttribute("aria-expanded", false);
  }
  openMenuItemID = undefined;
}

/**
 * PORTRAIT
 */

let portraitMaximized = false;
let portraitMinimized = false;

function clickPortraitMaximize() {
  const portrait = document.getElementById("portrait");
  portraitMaximized = !portraitMaximized;
  portrait.setAttribute("aria-hidden", false);
  portrait.setAttribute("aria-expanded", portraitMaximized);
}

function clickPortraitMinimize() {
  const portrait = document.getElementById("portrait");
  portraitMinimized = !portraitMinimized;
  portrait.setAttribute("aria-expanded", false);
  portrait.setAttribute("aria-hidden", portraitMinimized);
}

function clickPortraitClose() {
  const portrait = document.getElementById("portrait");
  portrait.setAttribute("aria-expanded", false);
  portrait.setAttribute("aria-hidden", false);
  portrait.setAttribute("aria-disabled", true);
}

/**
 * CHAT
 */
function clickChat() {
  if (window.innerWidth <= SCREEN_SIZE_SM_PX) {
    portraitMinimized = true;
    portrait.setAttribute("aria-disabled", false);
    document
      .getElementById("portrait")
      .setAttribute("aria-hidden", portraitMinimized);
  }
  document.getElementById("chat-input").focus();
}

function sendChat() {
  alert("send");
}

/**
 * BODY
 */

function clickBodyTab(id) {
  document
    .getElementById("body-content-1")
    .setAttribute("aria-expanded", false);
  document
    .getElementById("body-content-2")
    .setAttribute("aria-expanded", false);
  document
    .getElementById("body-content-3")
    .setAttribute("aria-expanded", false);
  document.getElementById(id).setAttribute("aria-expanded", true);
}
