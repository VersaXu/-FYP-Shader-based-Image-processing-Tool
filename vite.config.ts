import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv, ConfigEnv, UserConfigExport } from 'vite'
const envResolve = (mode: string, env: string) => loadEnv(mode, process.cwd())[env]

// 处理打包静态资源，图片资源放到img
const dualAssetFileNames = (assetInfo: any) => {
  const patten = /.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/g
  const isImage = patten.test(assetInfo.name)
  return `assets/${isImage ? 'img' : '[ext]'}/[name].[hash].[ext]`
}
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const ENV = envResolve(mode, 'VITE_ENV')
  const PROXY_URL = envResolve(mode, 'VITE_PROXY_URL')
  console.log('\x1b[36m%s\x1b[0m', '当前环境:', ENV)
  console.log('\x1b[36m%s\x1b[0m', '代理地址:', PROXY_URL)
  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: './mock',
        localEnabled: command === 'serve'
      })
    ],
    base: envResolve(mode, 'VITE_ROUTER_BASE'),
    server: {
      port: 9527,
      proxy: {
        '/api': {
          target: PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      modules: {
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        hashPrefix: 'prefix'
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    esbuild: {
      drop: ENV === 'production' ? ['console', 'debugger'] : [],
      minify: true
    },
    build: {
      assetsInlineLimit: 8192, // 小于8K的图片转成base64
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: dualAssetFileNames
        }
      }
    }
  }
}
