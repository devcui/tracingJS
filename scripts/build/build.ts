import typescript from "@rollup/plugin-typescript";
import { ModuleFormat, OutputOptions, RollupOptions, rollup } from "rollup";
import { babel } from "@rollup/plugin-babel";

function format(format: ModuleFormat): RollupOptions {
  return {
    input: "src/index.ts",
    output: {
      minifyInternalExports: true,
      sourcemap: true,
      dir: `dist/${format}`,
      format: format,
      name: "tracingJS",
      esModule: true,
      globals: {
        tracingjs: "tracingJS",
      },
    },
    plugins: [
      typescript({
        tsconfig: `./tsconfig.${format}.json`,
      }),
    ],
  };
}

function buildModule(module: ModuleFormat) {
  return rollup(format(module)).then((bundle) => {
    bundle.write(format(module).output as OutputOptions);
  });
}

async function buildAll() {
  await buildModule("umd");
  await buildModule("es");
  await buildModule("cjs");
}

buildAll();
