<template>  
    <v-dialog
      v-model="mydialog"      
    >
      <v-card>
        <v-card-title class="headline">Filter laden</v-card-title>

        <v-flex xs12>
            <v-combobox
            v-model="select"
            :items="items"
            label="Select a favorite activity or create a new one"
            ></v-combobox>
        </v-flex>        

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
        {{select}}
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props:{
     dialog: false
    },
    data(){
        return{
            mydialog:this.dialog,
            select:null
        }
    },
    methods:{
        click(){
            this.mydialog=false;
            this.$store.dispatch('Filter/setActualFilter');
            this.$emit('myEvent',false)
        }
    },
    computed:{
      items(){        
        return this.$store.getters['Filter/getFilter'].map(x=>x.Name)
      }
    },
    watch:{
        dialog: function(newVal,oldVal){
            this.mydialog = newVal
        }
    }
  }
</script>

