const GLITCH_SRCS = [
  "../images/glitch/1.gif",
  "../images/glitch/2.gif",
  "../images/glitch/3.gif",
  "../images/glitch/4.gif",
  "../images/glitch/5.webp",
];

function delay() {
  $("#glitch-container").empty();
  setTimeout(renderRandomGlitches, getRandomInt(3000, 15000));
}

delay();

function renderRandomGlitches() {
  renderRandomGlitch();
  renderRandomGlitch();
  renderRandomGlitch();
  setTimeout(delay, getRandomInt(200, 1000));
}

function renderRandomGlitch() {
  const img = GLITCH_SRCS[Math.floor(Math.random() * GLITCH_SRCS.length)];
  const { startX, startY, lenX, lenY } = getRandomCoords();
  $("#glitch-container").append(
    `<div class="col-start-${startX} row-start-${startY} col-span-${lenX} row-span-${lenY} bg-[url(${img})] opacity-25 bg-center bg-cover"></div>`,
  );
}

function getRandomCoords() {
  const startX = getRandomInt(1, 11);
  const startY = getRandomInt(1, 11);
  let lenX = getRandomInt(1, 3);
  let lenY = getRandomInt(1, 3);

  return {
    startX,
    startY,
    lenX,
    lenY,
  };
}

function getRandomInt(min, max) {
  return Math.ceil(Math.random() * (max - min + 1)) + min;
}
