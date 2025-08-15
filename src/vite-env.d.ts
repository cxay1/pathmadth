/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_JWT_SECRET?: string;
  // Add other environment variables you use here
}

declare module '*/assets/images' {
  export const hire1: string;
  export const hire2: string;
  export const hire3: string;
  export const hire4: string;
  export const hire5: string;
  export const hire6: string;
  export const hire7: string;
  export const hire8: string;
  export const hire9: string;
  export const people: string;
  export const stairs: string;
  export const skyscraper: string;
  export const people1: string;
  export const videoSrc: string;
  export const team: string;
}