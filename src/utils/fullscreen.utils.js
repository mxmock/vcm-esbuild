const toggleFullscreen = (fullscreen) => {
  const main = [...document.body.children].find((el) => el.tagName === "MAIN");
  fullscreen
    ? main.classList.add("fullscreen")
    : main.classList.remove("fullscreen");
};

export default toggleFullscreen;
