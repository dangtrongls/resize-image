import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import VueCroppie from 'vue-croppie'
import axios from "axios";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'croppie/croppie.css'
import router from './router'
import VuejsClipper from 'vuejs-clipper'
import plugin from '@serializedowen/vue-img-watermark'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
// import { ImageEditor } from '@toast-ui/vue-image-editor';
// import Moveable from "moveable";


Vue.config.productionTip = false
Vue.use(VueCroppie)
Vue.use(BootstrapVueIcons)
Vue.use(BootstrapVue)
Vue.use(plugin)

Vue.use(VuejsClipper, {
    components: {
        clipperBasic: true,
        clipperPreview: true
    }
});
Vue.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
});

Vue.prototype.$urlAPI = "http://192.168.1.28:81/checkImage/public/api/";
Vue.prototype.$siteName = "Tool Resize Image";

Vue.prototype.$config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};

Vue.prototype.CallAPI = function(method, url, data, callResponse, callError) {
    switch (method) {
        case "post":
            var bodyFormData = new FormData();
            bodyFormData.append('check_image', data['check_image'][0]);
            bodyFormData.append('social', data['social']);
            axios
                .post(this.$urlAPI + url, bodyFormData, {
                    ...this.$config,
                    "Content-Type": "multipart/form-data"
                })
                .then((response) => {
                    if (response.data.statusCode === 401) {
                        sessionStorage.clear();
                        location.reload();
                    }
                    callResponse(response);
                })
                .catch((error) => {
                    callError(error);
                });
            break;
        case "get":
            axios
                .get(this.$urlAPI + url, this.$config)
                .then((response) => {
                    if (response.data.statusCode === 401) {
                        sessionStorage.clear();
                        location.reload();
                    }
                    callResponse(response);
                })
                .catch((error) => {
                    callError(error);
                });
            break;
        case "put":
            axios
                .put(this.$urlAPI + url, data, this.$config)
                .then((response) => {
                    if (response.data.statusCode === 401) {
                        sessionStorage.clear();
                        location.reload();
                    }
                    callResponse(response);
                })
                .catch((error) => {
                    callError(error);
                });
            break;
        case "delete":
            axios
                .delete(this.$urlAPI + url, this.$config)
                .then((response) => {
                    if (response.data.statusCode === 401) {
                        sessionStorage.clear();
                        location.reload();
                    }
                    callResponse(response);
                })
                .catch((error) => {
                    callError(error);
                });
            break;
    }
};

new Vue({
    router,

    render: h => h(App)
}).$mount('#app')