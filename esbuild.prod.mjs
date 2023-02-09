import * as esbuild from "esbuild";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
import { writeFile } from "node:fs/promises";
import cssPlugin from "esbuild-plugin-css-opti";
import copyHtmlPlugin from "esbuild-plugin-copy-html";
import reactStaticPlugin from "esbuild-plugin-react-static";
import saveServerData from "esbuild-plugin-save-server-data";

const OUT_DIR = "prod";
const PAGES_FROM = "src/pages";
const JS_FROM = "src/index.js";
const SAVE_DATA_IN = "src/data";
const CSS_FROM = "src/index.scss";
const REDUX = { store, Provider };
const JS_OUT_DIR = `${OUT_DIR}/js`;
const CSS_OUT_DIR = `${OUT_DIR}/css`;

const TIME_LOG = `Build time`;

console.time(TIME_LOG);
const result = await esbuild.build({
  entryPoints: [JS_FROM],
  entryNames: "[name]_[hash]",
  bundle: true,
  minify: true,
  plugins: [
    saveServerData({
      saveIn: SAVE_DATA_IN,
      data: [
        {
          fileName: `villas`,
          url: `https://api.villascieletmer.fr/index.php/allVillas`,
        },
        {
          fileName: `annexe`,
          url: `https://api.villascieletmer.fr/index.php/infosAnnexe`,
        },
        {
          fileName: `cars`,
          url: `https://api.villascieletmer.fr/index.php/allCars`,
        },
      ],
    }),
    cssPlugin({ outDir: CSS_OUT_DIR, from: CSS_FROM }),
    reactStaticPlugin({
      outDir: `${OUT_DIR}/pages_w_react`,
      pages: PAGES_FROM,
      redux: REDUX,
    }),
    copyHtmlPlugin({
      htmlFromDir: `${OUT_DIR}/pages_w_react`,
      jsDir: JS_OUT_DIR,
      cssDir: CSS_OUT_DIR,
      outDir: OUT_DIR,
      removeOriginalDir: true,
    }),
  ],
  metafile: true,
  legalComments: "none",
  outdir: JS_OUT_DIR,
  pure: ["console"],
  loader: { ".jpg": "dataurl" },
});
console.timeEnd(TIME_LOG);
console.log("-------------------------------------------");

await writeFile("meta.json", JSON.stringify(result.metafile));
