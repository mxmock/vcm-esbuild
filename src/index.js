import store from "./redux/store";
import { Provider } from "react-redux";
import injectInHtml from "./utils/html.utils";
import Footer from "./components/Footer.static";
import Header from "./components/Header.static";
import CarsList from "./components/CarsList.static";
import VillasList from "./components/VillasList.static";
import CarGallery from "./components/CarGallery.static";
import CarDetails from "./components/CarDetails.static";
import VillaGallery from "./components/VillaGallery.static";
import VillaDetails from "./components/VillaDetails.static";
import VillaFormWrapper from "./components/villa-form/VillaFormWrapper";

const main = () => {
  console.log("Environnement:", process?.env?.NODE_ENV);

  calcSize();
  injectInHtml("footer", Footer);
  injectInHtml("header", Header);
  injectInHtml("carsList", CarsList);
  injectInHtml("villasList", VillasList);
  injectInHtml("carGallery", CarGallery);
  injectInHtml("carDetails", CarDetails);
  injectInHtml("villaGallery", VillaGallery);
  injectInHtml("villaDetails", VillaDetails);
  injectInHtml("villaFormWrapper", VillaFormWrapper, { store, Provider }, false);
};

const calcSize = () => {
  document.body.style.setProperty("--100vh", `${window.innerHeight}px`);
  document.body.style.setProperty("--100vw", `${window.innerWidth}px`);
};

window.addEventListener("load", main);
window.addEventListener("resize", calcSize);
