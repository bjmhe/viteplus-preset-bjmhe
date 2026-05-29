import * as attw from "@arethetypeswrong/core";
import * as publint from "publint";
import * as publintUtils from "publint/utils";
import type { TsdownInputOption } from "tsdown";
import ApiSnapshot from "tsnapi/rolldown";
import { mergeConfig, type UserConfig } from "vite-plus";

export interface LibOptions {
  entry?: "index" | "shallow" | "all" | Exclude<TsdownInputOption, string>;
  inlineDeps?: (string | RegExp)[];
}

export function lib(
  { entry = "index", inlineDeps = [] }: LibOptions = {},
  overrides: UserConfig = {},
): UserConfig {
  return mergeConfig(
    {
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
        platform: "neutral",
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
    },
    overrides,
  );
}

export function nodeLib(options: LibOptions = {}, overrides: UserConfig = {}): UserConfig {
  return lib(
    options,
    mergeConfig(
      {
        pack: {
          platform: "node",
        },
      },
      overrides,
    ),
  );
}
