# Eslint Plugin Rimac

## Architecture

-   When creating a new rule put it in the `src/rules` folder
    -   Name the file the same as the rule itself
    -   For example `rimac/import-declaration-newline` should be called `import-declaration-newline.ts`
-   Any shared `utils`/`functions`/`variables` should be put into `src/utils` folder

## Resources

-   [Typescript Eslint Docs](https://typescript-eslint.io/docs/development/custom-rules/)
-   [Writing Custom Rules Guide](https://www.darraghoriordan.com/2021/11/06/how-to-write-an-eslint-plugin-typescript/)
-   [Example Plugin](https://github.com/darraghoriordan/eslint-plugin-nestjs-typed)

## Note

-   Some of the rules have been taken and modified/updated from the following repos
    -   <https://github.com/gmsorrow/eslint-plugin-modules-newline>

## TODO

-   Figure out why `fixtures` folder is needed. Something to do with [this PR](https://github.com/typescript-eslint/typescript-eslint/pull/760)
