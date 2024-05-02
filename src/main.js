import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

library.add(faFacebookF)

// Register the component globally
// Vue.component('font-awesome-icon', FontAwesomeIcon)

// createApp(App).mount('#app')

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
