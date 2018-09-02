<template>  
    <v-form v-model="valid">
    <v-text-field
      v-model="getActualFilter.Name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    >{{getActualFilter.Name}}</v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Zutatenliste"
      required
    ></v-text-field>
    <v-btn @click="loadFilter">Filter laden</v-btn> 
    <v-btn>Filter speichern</v-btn>   
    <Filterladen @myEvent="close" v-bind:dialog="filterDialog"></Filterladen>
  {{getActualFilter}}
  </v-form>
 
</template>

<script>
import Filterladen from './Filterladen.vue'

  export default {
    data: () => ({
      filterDialog:false,
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
         v => /^[0-9]+(,[0-9]+)*$/.test(v) || 'Only Numbers seperated with comma'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),    
    methods:{
       loadFilter(){
          this.filterDialog=true;
       },
       close(){         
         this.filterDialog=false;
       }
    },
    computed:{
      getActualFilter(){
        return this.$store.getters['Filter/getActualFilter']
      }
    },
    components:{
        Filterladen
    }
  }
</script>

