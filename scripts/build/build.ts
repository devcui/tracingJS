import typescript from "@rollup/plugin-typescript";
import { ModuleFormat, OutputOptions, RollupOptions, rollup } from "rollup";
import { copy, copyPackageJSON, rmrf } from "../utils";

function format(format: ModuleFormat): RollupOptions {
  return {
    input: "src/index.ts",
    external: ["ua-parser-js", "rxjs"],
    output: {
      minifyInternalExports: true,
      sourcemap: true,
      dir: `dist/tracingJS/${format}`,
      format: format,
      name: "tracingJS",
      esModule: true,
      globals: {
        "ua-parser-js": "uaParserJs",
        rxjs: "rxjs",
      },
    },
    plugins: [
      typescript({
        tsconfig: `./tsconfig.${format}.json`,
      }),
    ],
  };
}

async function buildModule(module: ModuleFormat) {
  console.log(`build ${module} module......`);
  const bundle = await rollup(format(module));
  await bundle.write(format(module).output as OutputOptions);
  console.log(`build ${module} module over......`);
}

async function buildAll() {
  console.log("rm -rf dist......");
  rmrf("dist");
  console.log("rm -rf dist over......");
  await buildModule("umd");
  await buildModule("es");
  await buildModule("cjs");
  console.log("build modules finished......");
}

buildAll().then(() => {
  console.log("copy package.json to dist......");
  copyPackageJSON("dist/tracingJS/package.json")
  console.log("copy example to dist......");
  copy("example", "dist/tracingJS/example");
  console.log("copy files to dist over......");
});
