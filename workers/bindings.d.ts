/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
declare interface Env {
  __STATIC_CONTENT: KVNamespace;
  CONFIG: KVNamespace;
}

declare module '__STATIC_CONTENT_MANIFEST' {
  const manifest: string;
  export default manifest;
}
