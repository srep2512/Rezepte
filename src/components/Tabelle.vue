<template>
 <v-container fluid>
    <v-data-table
      :loading="loadingData"
      :headers="headers"
      :items="Rezepte"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">           
        <tr v-bind:class="{'status': props.item.status ==='NEW'}">  
          <td>{{ props.item.name }}</td> 
          <td class="text-xs-right">{{props.item.details }}</td>
          <v-btn @click="showDetails(props.item)">Details</v-btn>
          <v-btn @click=showStats(props.item)>Statistiken</v-btn>
        </tr>
      </template>
    </v-data-table>  

    <Formular></Formular>
    <!-- Detail Bereich -->
     <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-2">Details zum Rezept</h3>
              <div v-if="this.selectedRezept===null">
                Kein Rezept gewählt
              </div>
              <div v-else>
                {{this.selectedRezept.details}}
              </div>              
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    
    <!-- Filter auswahl -->
      
    <DetailView @myEvent="close" v-bind:dialog="detailDialog"></DetailView>
 
  <!-- Snackbar Notification -->
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"          
        >
          {{ text }}
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar> 
  </v-container>
</template>

<script>
import DetailView from './DetailView.vue'
import Formular from './Formular.vue'
  export default {
      data(){
        return{
        loadingData:true,
        snackbar: false,
        timeout: 2000,
        text: 'Filter angewandt',
          detailDialog:false,
          dateVon: null,
          date:null,
          menu: false,
          menuVon:false,
          headers:[
              { text: 'Name', value: 'name' },
              { text: 'Details', value: 'name' } ,
              {text:'Statistiken'}                           
            ],
            selectedRezept:null
          }          
      },
      mounted(){
        this.$store.dispatch('Rezepte/getRezepte')
        .then(x=>this.loadingData=false)        
      },
      computed:{
        Rezepte(){          
          return this.$store.getters['Rezepte/getRezepte'];          
        }
      },
      methods:{
        showDetails(e){
           this.selectedRezept = e           
        },
        showStats(e){
          this.$store.dispatch('Statistik/setStatistik',e)                    
          this.detailDialog=true

          //Get Selected Rezept
          //var RezeptId = this.$store.getters['Details/getRezept']

          //Lade Rezepte von API
            this.loadRezept=true
            this.$store.dispatch('Details/getRezepteforId', e)            
            .then(console.log(e.id)) 
        }
        ,
        close(){
          this.detailDialog=false
        }
      },
      components:{
        DetailView,
        Formular
      }
  }
</script>

<style>
.status{
  background-color: aquamarine
}
</style>
