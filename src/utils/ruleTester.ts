import { RuleTester } from "@typescript-eslint/experimental-utils/dist/eslint-utils";
import path from "path";

export const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2015,
        project: "./tsconfig.json",
        tsconfigRootDir: path.join(__dirname, "..", "fixtures")
    },
});
