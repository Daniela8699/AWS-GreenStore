<template>
  <div>
      
    <h2>Clients</h2>
    <div><b-button
          variant="outline-success"
          
          style="float:right;"
          @click="info2( $event.target)"
          class="mr-1"
        >
          Register Client
        </b-button><br></div>
    <br />
    <b-table striped hover :fields="fields" :items="items">
      <template #cell(actions)="row">
        <b-button
          variant="outline-primary"
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Edit
        </b-button>
        <b-button
          variant="outline-danger"
          size="sm"
          @click="deleteItem(row.item, row.index)"
          class="mr-1"
        >
          Delete
        </b-button>
      </template>
    </b-table>
    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
       @ok="handleOk"
      @hide="resetInfoModal"
    >
      
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="modal.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Id Number"
          label-for="idnumber-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="idnumber-input"
            v-model="modal.id_number"
            required
          ></b-form-input>
        </b-form-group>
    
                <b-form-group
          label="Address"
          label-for="address-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="address-input"
            v-model="modal.address"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Cellphone"
          label-for="cellphone-input"
          invalid-feedback="Cellphone is required"
        >
          <b-form-input
            id="cellphone-input"
            v-model="modal.cellphone"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <br>
    <h2>Tickets</h2>
    <br />
    <b-table striped hover :fields="fields2" :items="items2"><template #cell(actions)="row">
        <b-button
          variant="outline-primary"
          size="sm"
          @click="editTicket(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Edit
        </b-button>
        <b-button
          variant="outline-danger"
          size="sm"
          @click="deleteTicket(row.item, row.index)"
          class="mr-1"
        >
          Delete
        </b-button>
      </template></b-table>
    <!-- Info modal -->
    <b-modal
      :id="infoModal3.id"
      :title="infoModal3.title"
      @ok="okHandler"
      @hide="resetInfoModal"
    >
      
      <form ref="form">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="ticket.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Id Number"
          label-for="idnumber-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="idnumber-input"
            v-model="ticket.id_number"
            required
          ></b-form-input>
        </b-form-group>
    
                
        <b-form-group
          label="Cellphone"
          label-for="cellphone-input"
          invalid-feedback="Cellphone is required"
        >
          <b-form-input
            id="cellphone-input"
            v-model="ticket.cellphone"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <!-- Info modal -->
    <b-modal
      :id="infoModal2.id"
      :title="infoModal2.title"
        hide-footer
     
    >
      <b-form @submit="onSubmit2"  v-if="show2">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="client.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Cellphone:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="client.cellphone"
          type="number"
          required
          placeholder="Enter number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your ID Number:" label-for="input-3">
        <b-form-input
          id="input-2"
          v-model="client.id_number"
          type="number"
          required
          placeholder="Enter id number"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Your ID Number Picture:" label-for="input-3">
        <b-form-file
      @change="onFileSelected"
            placeholder="Choose a image."
    ></b-form-file>
    
      </b-form-group>

<b-form-group id="input-group-4" label="Your Name:" label-for="input-4">
        <b-form-input
          id="input-2"
          v-model="client.name"
          
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Your Address:" label-for="input-5">
        <b-form-input
          id="input-2"
          v-model="client.address"
          
          required
          placeholder="Enter address"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      
      
    </b-form>
      
      
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

    var AWS = require("aws-sdk");
    import { Auth } from 'aws-amplify';
  var jwt = require('jsonwebtoken'); 
    var creds = new AWS.Credentials({
        accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY
    });
    AWS.config.update({
        region: "us-west-2",
        credentials: creds
    });
export default {
  data() {
    return {
      show: true,
      show2: true,
       selectedFile: null, 
       url:""
      ,infoModal2: {
        id: "info-modal2",
        title: "Register Client",
        content: "",
      },show3: true
      ,infoModal3: {
        id: "info-modal3",
        title: "",
        content: "",
      },
      client:{
        name: "",
        cedula: "",
        correo: "",
        direccion: "",
        celular:"",
        address:""
      },
      ticket: {
        cellphone: "",
        id_number: "",
        name: "",
        product_id:"",
        product_name:""
      }
      ,fields: [
        { key: "name" },
        { key: "id_number" },
        { key: "email" },
        { key: "address" },
        { key: "cellphone" },
        { key: "actions" },
      ],
      items: [],
      fields2: [
        { key: "product_id" },
        { key: "product_name" },
        { key: "email" },
        { key: "id_number" },
        { key: "name" },
        { key: "cellphone" },
        { key: "actions" },
      ],
      items2: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      modal: {
        name: "",
        id_number: "",
        email: "",
        address: "",
        cellphone:""
      },
    };
  },
  mounted() {
    for (let i = 0; i < 7; i++) {
    axios
      .get(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        this.items = r.data.body.clients.Items;
        this.items2 = r.data.body.data.Items;
        
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });}
  },
  methods: {
     onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.url = URL.createObjectURL(this.selectedFile);
      
    },
    info2( button) {
      // Reset our form values
        this.client.email = ''
        this.client.cellphone = ''
        this.client.id_number = ''
        this.client.name = ''
        this.client.address = ''
      
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    },
     onSubmit2(evt) {
         evt.preventDefault()
        
        Auth.currentSession().then(res=>{
          let accessToken = res.getAccessToken()
          let jwt1 = accessToken.getJwtToken()
          console.log(jwt.decode(jwt1, {complete: true}).payload["cognito:groups"])
          
          axios.post(
            `https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/?correo=` +
              this.client.email + `&name=` + this.client.name + `&cedula=` + this.client.id_number + `&direccion=`+ this.client.address +`&cellphone=`+ this.client.cellphone,{},
              {headers: {
              'Content-Type': 'application/json',
              'Authorization': jwt1
            }},
            ).then( (r) => {
              console.log(r)
              alert(r.data.body)
            
      
       
        
      

              window.location.reload()
              
            })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response)
                alert(error.response.data.message)
              }
          });

          

          })
          
        
      },
      editTicket(item, index, button) {
      this.infoModal3.title = `Edit ticket: ${item.product_id}`;
      this.ticket.name = item.name
      this.ticket.id_number = item.id_number
      this.ticket.email = item.email
      this.ticket.cellphone = item.cellphone
      this.ticket.product_id = item.product_id
      this.ticket.product_name = item.product_name
      this.$root.$emit("bv::show::modal", this.infoModal3.id, button);
    },
    info(item, index, button) {
      this.infoModal.title = `Edit user: ${item.email}`;
      this.modal.name = item.name
      this.modal.id_number = item.id_number
      this.modal.email = item.email
      this.modal.address = item.address
      this.modal.cellphone = item.cellphone
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    deleteItem(item, index) {
      console.log(item.email)
      for (let i = 0; i < 7; i++) {
      axios
      .delete(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data:{
            "email": item.email 
          }
        }
      )
      .then((r) => {

        console.log(r);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });
      }
    
      this.items.splice(index, 1);
    },deleteTicket(item, index) {
      console.log(item.email)
      
      for (let i = 0; i < 1; i++) {
      axios
      .delete(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/tickets",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data:{
            "email": item.email,
            "product_id": item.product_id 
          }
        }
      )
      .then((r) => {

        console.log(r.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });
      }
    
      this.items2.splice(index, 1);
    },
    handleOk() {
        this.$nextTick(() => {
          this.$bvModalEvt.hide('modal-prevent-closing')
        })
        
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        console.log(this.modal)
        var client = this.modal
        
        for (let i = 0; i < 6; i++) {
        axios
      .put(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data:{
            client
          }
        }
      )
      .then((r) => {

        console.log(r.data);
        console.log(i);
        
        if(i==5){
          window.location.reload()
        }
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });}
      
      console.log(JSON.stringify(client, null, 2))
        // Hide the modal manually
      
      },
      okHandler() {
    console.log("entro")
        this.$nextTick(() => {
          this.$bvModalEvt.hide('modal-prevent-closing')
        })
        
        // Trigger submit handler
        this.handleSubmit3()
      },
      handleSubmit3() {
        // Exit when the form isn't valid
        console.log(this.ticket)
        var ticket = this.ticket
        
        for (let i = 0; i < 16; i++) {
        axios
      .put(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/tickets",
        {
          headers: {
            "Content-Type": "application/json",
          },
         
            "ticket": ticket
          
        }
      )
      .then((r) => {

        console.log(r.data);
        console.log(i);
        
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });}
      
      console.log(JSON.stringify(ticket, null, 2))
        // Hide the modal manually
      
      }
  },
  
};
</script>