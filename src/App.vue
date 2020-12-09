<template>
  <div>

    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator>
      <b-navbar toggleable="sm" type="dark" variant="dark" fixed >
    <b-navbar-brand href="#">Green Store</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      
        <amplify-sign-out @click="check"></amplify-sign-out>
       

        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
      <div style="text-align: center" v-if="authState === 'signedin' && user">
        
        
        <br>
        
        <UserTable v-if="userType !== undefined"></UserTable>
        <Products v-if="userType === undefined"></Products>
      </div>
      
    </amplify-authenticator>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import UserTable from './components/UserTable'
import Products from './components/Products'


var jwt = require('jsonwebtoken'); 

export default {
  name: 'App',
     data() {
    return {
      userType:undefined,
      user: undefined,
      authState: undefined
     }},
  components: {

    UserTable,Products,

  },
  created(){
    
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
      Auth.currentSession().then(res=>{
          let accessToken = res.getAccessToken()
          let jwt1 = accessToken.getJwtToken()
         
          this.userType = jwt.decode(jwt1, {complete: true}).payload["cognito:groups"][0]
  });
    })
    
 },
  methods :{
    check() {
      console.log('entro')
      this.userType = undefined
     
    },

  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
