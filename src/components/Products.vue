<template>
  <section class="catalog-cars">
    <h2>Products</h2>
    <hr>
    <br>
      <v-container class="grey lighten-4">
    <v-row no-gutters>
      <template v-for="n in products">
        <v-col style="
    padding-bottom: 20px;
    padding-right: 20px;
" :key="n.id">
          <app-product
          :product = "n"
          >
          
          </app-product>
          <br>
          <b-button style="
    width: -webkit-fill-available;
"
          variant="outline-primary"
          size="sm"
          @click="info(n, $event.target)"
          class="mr-1"
        >
          Contact
        </b-button>
        </v-col>
        <v-responsive
          v-if="n === 2"
          :key="`width-${n}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
      </v-container>
      <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
        hide-footer
      @hide="resetInfoModal"
    >
      <b-form @submit="onSubmit"  v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="ticket.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Cellphone:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="ticket.cellphone"
          type="number"
          required
          placeholder="Enter number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your ID Number:" label-for="input-3">
        <b-form-input
          id="input-2"
          v-model="ticket.id_number"
          type="number"
          required
          placeholder="Enter id number"
        ></b-form-input>
      </b-form-group>

<b-form-group id="input-group-4" label="Your Name:" label-for="input-4">
        <b-form-input
          id="input-2"
          v-model="ticket.name"
          
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button   @click="$bvModal.hide('info-modal')">Close </b-button>
      
    </b-form>
      
      
    </b-modal>
  </section>
</template>

<script>
import Product from "./Product";
import axios from "axios";

export default {
  components: {

    appProduct: Product,
  },
  data() {
    return {
        show: true
      ,
      products: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
        ticket: {
        email: "",
        cellphone: "",
        id_number: "",
        name: "",
        product_name: "",
        product_id: "",
      },
    };
  },
   created() {
       axios
      .get(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/products",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
          this.products = r.data.body.Items
          
        
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      })
  }, methods: {
    info(item,  button) {
      // Reset our form values
        this.ticket.email = ''
        this.ticket.cellphone = ''
        this.ticket.id_number = ''
        this.ticket.name = ''

      this.infoModal.title = `Id Product: ${item.id}`;
      this.ticket.product_name = item.product_name
      
      this.ticket.product_id = item.id
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
     onSubmit(evt) {
        evt.preventDefault()
        
       axios
      .post(
        "https://13mi9oqfbk.execute-api.us-west-2.amazonaws.com/produccion/tickets",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: this.ticket
        }
      )
      .then((r) => {
        console.log(r.data)
        alert("Your ticket has been created!!")
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          alert(error.response.data.message);
        }
      });
        
      },
      
  }
};
</script>

<style>


</style>