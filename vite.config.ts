import * as attw from "@arethetypeswrong/core";
import * as publint from "publint";
import * as publintUtils from "publint/utils";
import ApiSnapshot from "tsnapi/rolldown";
import { defineConfig } from "vite-plus";

const inlineDeps: (string | RegExp)[] = [];
const entry = "index";

export default defineConfig({
  pack: {
    attw: {
      enabled: false,
      profile: "esm-only",
      module: attw,
      level: "warn",
    },
    banner: "/*! Keep it simple, keep it free */",
    deps: { onlyBundle: inlineDeps },
    devtools: true,
    dts: {
      tsgo: true,
    },
    entry:
      entry === "index"
        ? "src/index.ts"
        : entry === "shallow"
          ? "src/*.ts"
          : entry === "all"
            ? "src/**/*.ts"
            : entry,
    exports: {
      packageJson: true,
      legacy: true,
    },
    footer: "/*! Built with love & coffee ☕ */",
    platform: "node",
    plugins: [ApiSnapshot()],
    publint: {
      enabled: "ci-only",
      module: [publint, publintUtils],
    },
    shims: true,
    sourcemap: true,
    unused: true,
  },
  lint: {
    ignorePatterns: ["__snapshots__/**/*", "dist/**/*"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    bracketSameLine: true,
    ignorePatterns: ["__snapshots__/**/*", "dist/**/*"],
    jsdoc: true,
    sortImports: true,
    sortTailwindcss: true,
  },
});
