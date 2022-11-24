import { defineStore } from 'pinia';
import roupas from "../content/roupas.json";
import backgrounds from "../content/backgrounds.json";

export const useRoupasStore = defineStore('RoupasStore', {
  state: () => ({
    roupaAtiva: roupas[0].imagem,
    bgAtiva: backgrounds[0].imagem,
    roupas,
    backgrounds
  }),

  actions: {
    addRoupa(payload) {
      let struct = this.roupas.find(struct => struct.id === payload)
      struct.comprado = 1
    },
    addBackground(payload) {
      let struct = this.backgrounds.find(struct => struct.id === payload)
      struct.comprado = 1
    },
    getUnlocked(payload) {
      let roupa = this.roupas.find(roupa => roupa.id === payload)

      if (roupa){
        return roupa.comprado
      }

      let bg = this.backgrounds.find(bg => bg.id === payload)

      if (bg){
        return bg.comprado
      }

      return "no match"
    }
  },
});