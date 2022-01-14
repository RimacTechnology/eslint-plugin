# Eslint Plugin Rimac

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Changelog](https://img.shields.io/badge/changelog-conventional-brightgreen.svg)](http://conventional-changelog.github.io)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Architecture

-   When creating a new rule put it in the `src/rules` folder
    -   Name the file the same as the rule itself
    -   For example `rimac/import-declaration-newline` should be called `import-declaration-newline.ts`
-   Any shared `utils`/`functions`/`variables` should be put into `src/utils` folder

## Resources

-   [Typescript Eslint Docs](https://typescript-eslint.io/docs/development/custom-rules/)
-   [Writing Custom Rules Guide](https://www.darraghoriordan.com/2021/11/06/how-to-write-an-eslint-plugin-typescript/)
-   [Example Plugin](https://github.com/darraghoriordan/eslint-plugin-nestjs-typed)
-   [Playground](https://astexplorer.net/)

## Notes

-   [ASTree line properties are 1 based](https://gist.github.com/azu/8866b2cb9b7a933e01fe)

## Acknowledgments

-   Some of the rules have been taken and modified/updated from the following repos
    -   <https://github.com/gmsorrow/eslint-plugin-modules-newline>

## TODO

-   Figure out why `fixtures` folder is needed. Something to do with [this PR](https://github.com/typescript-eslint/typescript-eslint/pull/760)
