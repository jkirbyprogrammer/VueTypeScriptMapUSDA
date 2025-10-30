Interactive Leaflet map example using Vue.js version 3, Vite, TypeScript, Vue Leaflet (currently beta version, no documentation). Example uses public data from USDA, since they do not have any interactive maps like this. This uses data from 2022 crop census, Disaster Designation Information Made By the US Secretary of Agriculture, Presidential Emergency Declarations, USFS fire occurance data all linked together in a clean interactive web map at county & state level. Points are converted to circle makers with pop up details. County and state layers are clickable polygons with details. 

- Project uses data that was pulled from USDA from 2018 to mid 2025: 
  - https://www.fsa.usda.gov/resources/disaster-assistance-program/disaster-designation-information
  - USDA quick stats
- Application Details:
  - vue v3.5.22
  - vite v6.0.1
  - leaflet v1.9.4
  - vue-leaflet/vue-leaflet v0.10.1
  - typescript v5.9.0
 - Application Screenshots:
   - <img width="941" height="893" alt="image" src="https://github.com/user-attachments/assets/4d407ca6-0b3c-4702-9488-99f9c6aa30eb" />
   - <img width="920" height="866" alt="image" src="https://github.com/user-attachments/assets/80169be0-59ac-4ff4-a12d-1ed66724d378" />
   - <img width="935" height="901" alt="image" src="https://github.com/user-attachments/assets/47c5a3f7-8663-4f08-9042-200346131c5e" />
   - <img width="922" height="901" alt="image" src="https://github.com/user-attachments/assets/3c742bc9-2765-46c3-aeb8-874b1047f606" />
   - <img width="920" height="896" alt="image" src="https://github.com/user-attachments/assets/fbe9c90c-43a0-487a-b3fe-efb3eae6c5fa" />

# vuetypescriptmapusda

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
