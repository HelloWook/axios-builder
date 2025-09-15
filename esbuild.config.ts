import * as esbuild from "esbuild";

// CommonJS 빌드 설정
async function buildCjs() {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.cjs",
    bundle: true,
    platform: "node",
    format: "cjs",
    external: ["axios"],
    sourcemap: true,
  });
  console.log("CommonJS build completed");
}

// ESM 빌드 설정
async function buildEsm() {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.mjs",
    bundle: true,
    platform: "node",
    format: "esm",
    external: ["axios"],
    sourcemap: true,
  });
  console.log("ESM build completed");
}

// UMD 빌드 설정
async function buildUmd() {
  await esbuild.build({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.umd.js",
    bundle: true,
    platform: "neutral",
    format: "iife",
    globalName: "AxiosBuilder",
    external: ["axios"],
    sourcemap: true,
    banner: {
      js: `
        (function (root, factory) {
          if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['axios'], factory);
          } else if (typeof module === 'object' && module.exports) {
            // Node. Does not work with strict CommonJS, but
            // only CommonJS-like environments that support module.exports,
            // like Node.
            module.exports = factory(require('axios'));
          } else {
            // Browser globals (root is window)
            root.AxiosBuilder = factory(root.axios);
          }
        }(typeof self !== 'undefined' ? self : this, function (axios) {
      `,
    },
    footer: {
      js: `
          return AxiosBuilder;
        }));
      `,
    },
  });
  console.log("UMD build completed");
}

Promise.all([buildCjs(), buildEsm(), buildUmd()]).catch((e) => {
  console.error("Build failed:", e);
  process.exit(1);
});
