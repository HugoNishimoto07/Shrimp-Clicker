import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    points: 0,
  }),
  getters: {

  },
  actions: {
    pointAdd(payload) {
        this.points += payload;
    },
    pointDecrement(payload) {
        this.points -= payload
    }
  },
});
