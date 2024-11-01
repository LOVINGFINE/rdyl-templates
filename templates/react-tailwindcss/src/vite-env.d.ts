/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare type PropsChildrenWithStyles<T = object> = T & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};