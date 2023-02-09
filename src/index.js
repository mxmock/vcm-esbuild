import store from "./redux/store";
import { Provider } from "react-redux";
import injectInHtml from "./utils/html.utils";
import Footer from "./components/Footer.static";
import Header from "./components/Header.static";
import CarsList from "./components/CarsList.static";
import VillasList from "./components/VillasList.static";
import VillaDetails from "./components/VillaDetails.static#provider";

const main = () => {
  console.log("Environnement:", process?.env?.NODE_ENV);

  injectInHtml("footer", Footer);
  injectInHtml("header", Header);
  injectInHtml("carsList", CarsList);
  injectInHtml("villasList", VillasList);
  injectInHtml("villaDetails", VillaDetails, { store, Provider });
};

window.addEventListener("load", main);
