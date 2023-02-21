import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteSvgr from "vite-plugin-svgr";
import envCompatible from 'vite-plugin-env-compatible';
import babelPluginMacros from "vite-plugin-babel-macros";


export default defineConfig({ 
  build: { outDir: 'build' },
  esbuild: {
    jsxFactory: 'jsx'
  },
  plugins: [react(), viteSvgr(), envCompatible({ prefix: 'REACT_APP'}), babelPluginMacros()]
});
