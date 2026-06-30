$("#body-content-1-button").on("click", () => clickBodyTab("body-content-1"));
$("#body-content-2-button").on("click", () => clickBodyTab("body-content-2"));
$("#body-content-3-button").on("click", () => clickBodyTab("body-content-3"));

function clickBodyTab(id) {
  const bodyContentIds = ["body-content-1", "body-content-2", "body-content-3"];

  bodyContentIds.forEach((bodyId) => {
    if (id === bodyId) {
      $(`#${id}`).attr("aria-expanded", true);
    } else {
      $(`#${bodyId}`).attr("aria-expanded", false);
    }
  });
}
