import * as path from "path";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import reactNativeWeb from "vite-plugin-react-native-web";

import manifest from "./src/manifest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js",
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "react-native-svg":
          "react-native-svg/lib/commonjs/ReactNativeSVG.web.js",
        "expo-router": path.resolve(__dirname, "./src/stubs/expo-router.js"),
        "~": path.resolve(__dirname, "../../packages/app"),
      },
    },
    plugins: [
      react({
        include: /\.(t|j)sx?$|\.mjs$/,
        babel: {
          plugins: [
            [
              "@babel/plugin-transform-react-jsx",
              {
                runtime: "automatic",
                importSource: "nativewind",
              },
            ],
          ],
        },
      }),
      reactNativeWeb(),
      crx({ manifest }),
    ],
    optimizeDeps: {
      force: true,
      include: ["react-native-web"],
      esbuildOptions: {
        loader: {
          ".mjs": "jsx",
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
        host: "localhost",
        clientPort: 5173,
      },
      watch: {
        usePolling: true,
      },
    },
  };
});
