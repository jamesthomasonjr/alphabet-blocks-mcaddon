# Alphabet Blocks for Minecraft: Bedrock Edition 

This is a Minecraft add-on that adds Alphabet Blocks.

## Use

- Run `npm run-script build` to generate the behavior and resource pack files
- Run `npm run-script dev` to copy the packs to the `development_behavior_packs` and `development_resource_packs` directories
- Run `npm run-script watch` to watch for changes to `tasks/build-blocks.ts` and rerun `build` and `dev`.
- Run `npm run-script package` to create an mcaddon file.

## Development notes

### Work in progress

This does not currently create every letter as a block. It has patterns for:
- A
- E
- I
- L
- S
- X
- Circle
- Circle Outline
- Heart
- Heart Outline
- Star
- Star Outline

### Roadmap

- Finish the alphabet
- Add themes for 32x32, 64x64, etc blocks, not just 16x16.
