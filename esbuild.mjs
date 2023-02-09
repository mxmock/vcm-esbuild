import * as esbuild from "esbuild";

const OUT_DIR = "src";
const JS_FROM = "src/index.js";

const loggerPlugin = {
  name: "logger",
  setup(build) {
    build.onEnd((result) => {
      if (!!result.errors.length) {
        console.log(`Build ended with ${result.errors.length} errors`);
      } else {
        console.log(`Build ended successfully !`);
      }
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: [JS_FROM],
  bundle: true,
  plugins: [loggerPlugin],
  sourcemap: true,
  outdir: `${OUT_DIR}/js`,
  color: true,
  loader: { ".jpg": "dataurl" },
});

await ctx.watch();
console.log("Esbuild is watching for changes. Press Ctrl-C to stop.");
