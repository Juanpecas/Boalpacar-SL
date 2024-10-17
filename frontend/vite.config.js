import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Esto es útil si alguna librería requiere 'global' en el navegador
  },
  build: {
    outDir: 'dist', // Directorio donde se guardarán los archivos de producción
    sourcemap: true, // Incluye los sourcemaps para facilitar la depuración en producción
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Extrae las dependencias de node_modules en un chunk separado
          }
        }
      }
    }
  }
});
