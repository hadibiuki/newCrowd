import { defineNuxtModule } from '@nuxt/kit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook('components:dirs', dirs => {
      dirs.push({
        path: join(__dirname, 'components'),
        prefix: 'Ui',
      });
    });
  },
});
