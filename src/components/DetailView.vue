<template>  
    <v-dialog
      v-model="mydialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Wie Beliebt ist das Gericht?</v-card-title>

        <v-card-text>
          Das Gericht {{Statistik.Name}} wurde bereits {{Statistik.Anzahl}} verspeist
        </v-card-text>

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
     dialog: false
    },
    data(){
        return{
            mydialog:this.dialog
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
        }
    }
  }
</script>

