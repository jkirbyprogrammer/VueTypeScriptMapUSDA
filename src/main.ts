import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
//import router from './router'; // Import the router instance if you want more routes or params

const app = createApp(App);
//app.use(router); // Use the router if needed

app.mount('#app');
