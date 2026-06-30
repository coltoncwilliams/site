let openMenuItemID = undefined;

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
  openMenuItemID = undefined;
}
