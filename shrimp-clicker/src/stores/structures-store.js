import { defineStore } from 'pinia';
import structures from "../content/estruturas.json";

export const useStructureStore = defineStore('StructureStore', {
  state: () => ({
    structures,
    purchaseList: [],
    lagostaPower: 120
  }),

  getters: {
    getCostById: (state) => {
      return (payload) => {
        let struct = state.structures.find(struct => struct.id === payload)
        let qntd = parseFloat(struct.purchases)
        let mult = parseFloat(struct.multiplicative) ** qntd;
        let add = parseFloat(struct.additive) * qntd
        return (Math.ceil((parseFloat(struct.custoInit) + (add)) * (mult)))
      }
    },

    totalCps(state) {
      let cps = 0 //ARRUMAR ESSA FUNÇÃO

      state.structures.forEach((key) => {
        let amount = key.purchases

        cps += (parseFloat(key.cps) * parseFloat(amount))
      })
      return cps
    },
  },


  actions: {
    setLP(payload) {
      this.lagostaPower = payload
    },
    addStructure(payload) {
      let struct = this.structures.find(struct => struct.id === payload)
      struct.purchases += 1
      this.purchaseList.push(struct.icone)
    },

    getAmount(payload) {
      let struct = this.structures.find(struct => struct.id === payload)

      if (struct) {
        return struct.purchases
      }
      else {
        return "no match"
      }
      
    }
  },
});