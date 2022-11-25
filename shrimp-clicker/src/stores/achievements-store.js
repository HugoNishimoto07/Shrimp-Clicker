import { defineStore } from "pinia";
import achievements from "../content/achievements.json";

import { useStructureStore } from "../stores/structures-store.js";
import { usePlayerStore } from "../stores/player-store.js";
import { useRoupasStore } from "../stores/roupas-store.js";

const RoupasStore = useRoupasStore();
const structureStore = useStructureStore();
const playerStore = usePlayerStore();

export const useAchievementsStore = defineStore("achievements", {
  state: () => ({
    achievements,
    tituloAtivo: "Camarão bebe",
  }),
  getters: {
    getAchievementsUnlocked: (state) => {
      return state.achievements.filter((achiv) => {
        if (achiv.obtido == 1) {
          return achiv;
        }
      });
    },
  },
  actions: {
    unlock(num) {
      achievements[num].obtido = 1
    },
    checkForUnlocks() {
      let locked = achievements.filter((achiv) => {
        if (achiv.obtido == 0) {
          return achiv;
        }
      });

      locked.forEach((achiev) => {
        var allUnlock = true
        if (achiev["amount"]) {
          if (playerStore.points >= achiev.amount) {
            achiev.obtido = 1;
          }
        }

        if (achiev["unlocks"]) {
          achiev.unlocks.forEach((unlock) => {
            let target = structureStore.getAmount(unlock[0]);
            if (target == "no match") {
              target = RoupasStore.getUnlocked(unlock[0]);
            }

            if (target == "no match") {
              target = 0
            }

            if (target < unlock[1]) {
              allUnlock = false
            }
          });

          if (allUnlock) {
            achiev.obtido = 1;
          }
        }
      });
    },
  },
});
