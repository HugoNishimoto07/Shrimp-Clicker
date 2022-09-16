import { defineStore } from 'pinia';
import structures from "../content/estruturas.json";

let dict = {};
structures.forEach(element => { dict[element.id] = 0 })
let purchases = dict

// Isso aqui ficou uma gambiarra, pesquisar o jeito certo de fazer isso

export const useStructureStore = defineStore('StructureStore', {
  state: () => ({
    structures,
    purchases
  }),
  
  getters: {
    TotalCps() {
        var cps = 0;

        for(var key in this.purchases){
            var amount = this.purchases[key];

            cps += this.structures[cps] * amount
        }

        return cps
    },
  },

  actions: {
    addStructure(payload) {
      this.purchases[payload] += 1;
    },

    Custo(payload) {
      let qntd = parseFloat(this.purchases[payload])
      let struct = this.structures.find( struct => struct.id === payload )
      let mult = qntd > 0 ? parseFloat(struct.multiplicative) * qntd : 1;
      let add = parseFloat(struct.additive) * qntd

      return ((parseFloat(struct.custoInit) + (add)) * (mult))
    }
  },
});