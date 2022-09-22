import { defineStore } from 'pinia';
import structures from "../content/estruturas.json";

export const useStructureStore = defineStore('StructureStore', {
  state: () => ({
    structures,
  }),
  
  getters: {
    getCostById: (state) => {
      return (payload) => {
          let struct = state.structures.find( struct => struct.id === payload )
          let qntd = parseFloat(struct.purchases)
          let mult = parseFloat(struct.multiplicative) ** qntd;
          let add = parseFloat(struct.additive) * qntd
          console.log(qntd)
          console.log(mult)
          return (Math.ceil((parseFloat(struct.custoInit) + (add)) * (mult)))
        }
      }
    },

    totalCps() {
        var cps = 0;

        for(var key in this.purchases){
            var amount = this.purchases[key];

            cps += this.structures[cps] * amount
        }

        return cps
    },

  actions: {
    addStructure(payload) { //Maybe bake this into the structures file?
      console.log(payload)
      let struct = this.structures.find( struct => struct.id === payload )
      struct.purchases += 1
    }
  },
});