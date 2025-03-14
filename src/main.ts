import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // 🔥 Asegura que los estilos se carguen
import '@mdi/font/css/materialdesignicons.css'; // 🔥 Agrega iconos de Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// 🔥 Configurar Vuetify con iconos y componentes
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');