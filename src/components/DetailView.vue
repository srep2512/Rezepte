<template>  
    <v-dialog
      v-model="mydialog"      
    >
      <v-card>
        <v-card-title class="headline">Detailansicht der Rezepte</v-card-title>

        <v-data-table
          :headers="headers"
          :items="Rezepte"
          hide-actions
          :loading=loadRezept
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
        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="click"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props:{
     dialog: false,
     loading:true
    },
    data(){
        return{
            mydialog:this.dialog,
            loadRezept:this.loading,
            Rezepte:[],
            headers:[
              { text: 'Name', value: 'Name' },
              { text: 'Erstellungdatum', value: 'Datum' } ,
              { text: 'Bewertung', value: 'Bewertung' } ,
              { text: 'Menu' }          
            ]          
        }
    },
    methods:{
        click(){
            this.mydialog=false;
            this.$emit('myEvent',false)
        }
    },
    computed:{
      Statistik(){        
        return this.$store.getters['Statistik/getStatistik']
      }
    },
    watch:{
        dialog: function(newVal,oldVal){
            this.mydialog = newVal
        },
        loading: function(newVal,oldVal){
            this.loadRezept = newVal
        }
    }
  }
</script>

