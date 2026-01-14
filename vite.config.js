import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Указываем базовый путь для GitHub Pages
  base: '/Practice-Promises-Date-flatpickr-notiflix/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        colorSwitcher: resolve(__dirname, '01-color-switcher.html'),
        countdownTimer: resolve(__dirname, '02-timer.html'),
        promiseGenerator: resolve(__dirname, '03-promises.html'),
      },
    },
  },
});
