/// <reference types="vite/client" />
import { ComponentCustomProperties } from "vue";

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** @i18n */
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: TR;
  }
}
