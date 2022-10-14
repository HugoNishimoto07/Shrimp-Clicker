import { defineStore } from 'pinia';
import roupas from "../content/roupas.json";

export const useRoupasStore = defineStore('RoupasStore', {
  state: () => ({
    roupaAtiva: roupas[0].imagem,
    roupas
  }),

  actions: {
    addRoupa(payload) {
      let struct = this.roupas.find(struct => struct.id === payload)
      struct.comprado = 1
    }
  },
});