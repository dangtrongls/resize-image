import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import VueCroppie from 'vue-croppie'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'croppie/croppie.css'

import router from './router'

Vue.config.productionTip = false
Vue.use(VueCroppie)
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')