/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_ROUTER_BASE: string
  readonly VITE_API_BASE: string
  readonly VITE_PROXY_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
