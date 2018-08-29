<template>
 <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="Rezepte"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">           
        <tr v-bind:class="{'status': props.item.Status ==='NEW'}">  
          <td>{{ props.item.Name }}</td> 
          <td class="text-xs-right">{{props.item.Datum }}</td>   
          <td class="text-xs-right">{{props.item.Bewertung }}</td> 
          <v-btn @click="showDetails(props.item)">Details</v-btn>
          <v-btn @click=showStats(props.item)>Statistiken</v-btn>
        </tr>
      </template>
    </v-data-table>  


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
                {{this.selectedRezept.Details}}
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
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
               <v-menu
                  ref="menuVon"
                  :close-on-content-click="false"
                  v-model="menuVon"
                  :nudge-right="40"
                  :return-value.sync="dateVon"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dateVon"
                    label="Von Datum"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="dateVon" @input="$refs.menuVon.save(dateVon)"></v-date-picker>
                </v-menu>  

                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="date"
                    label="Von Datum"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
                </v-menu> 
                <v-btn @click="snackbar = true">Filter anwenden</v-btn>    
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <DetailView @myEvent="close" v-bind:dialog="detailDialog"></DetailView>
 
  <!-- Snackbar Notification -->
        <v-snackbar
          v-model="snackbar"
          :color="color"
          :multi-line="mode === 'multi-line'"
          :timeout="timeout"
          :vertical="mode === 'vertical'"
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

  export default {
      data(){
        return{
        snackbar: false,
        timeout: 2000,
        text: 'Filter angewandt',
          detailDialog:false,
          dateVon: null,
          date:null,
          menu: false,
          menuVon:false,
          headers:[
              { text: 'Name', value: 'Name' },
              { text: 'Erstellungdatum', value: 'Datum' } ,
              { text: 'Bewertung', value: 'Bewertung' } ,
              { text: 'Menu' }          
            ],
            selectedRezept:null
          }          
      },
      computed:{
        Rezepte(){
          return this.$store.getters['Rezepte/getRezepte']
        }
      },
      methods:{
        showDetails(e){
           this.selectedRezept = e           
        },
        showStats(e){
          this.$store.dispatch('Statistik/setStatistik',e)
          this.detailDialog=true
        }
        ,
        close(){
          this.detailDialog=false
        }
      },
      components:{
        DetailView
      }
  }
</script>

<style>
.status{
  background-color: aquamarine
}
</style>
