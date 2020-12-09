import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import Vuetify from 'vuetify'

import 'element-ui/lib/theme-chalk/index.css';

import Products from './components/Products'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(Vuetify);
import "@aws-amplify/ui-vue";


Vue.config.productionTip = false

const routes = [

   {path: "/products", component: Products,
   

   }
 
   
  
]
Amplify.configure({
  Auth: {
      // REQUIRED - Amazon Cognito Region
      region: 'us-west-2',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-west-2_nEqXM2CGF',

      userPoolWebClientId: '2mh1ra8qgso00s2o6i3dvh5vgj',

  }
});

Vue.use(VueRouter)
Vue.use(Element);
const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
