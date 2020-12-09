<template>
  <div >
<b-card
    no-body
    style="max-width: 20rem"
    :img-src="product.image_src"
    img-alt="Image"
    img-top
  >
    <template #header>
      <h4 class="mb-0">{{product.product_name}}</h4>
    </template>

    <b-card-body>
      <b-card-title>{{ (product.price ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                })}}</b-card-title>
      <b-card-sub-title class="mb-2">Product ID: {{product.id}}</b-card-sub-title>
      <b-card-text>{{product.description}}
      </b-card-text>

    </b-card-body>

    
 <b-card-footer>Stock: {{product.stock}}</b-card-footer>

   
  </b-card>
    
  </div>
</template>

<script>
export default {
 
  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    
    
   

    
  
  },
};
</script>

<style>


</style>