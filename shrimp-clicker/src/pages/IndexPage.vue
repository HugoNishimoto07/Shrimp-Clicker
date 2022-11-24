<template>
  <q-page>
    <div
      class="full-width fit row justify-between bgimg"
      :style="{ 'background-image': 'url(' + bgImage + ')' }"
    >
      <div
        style="overflow: auto; min-width: 60%; max-width: 60%"
        class="center non-selectable"
        @click="clickRegister()"
      >
        <q-card
          class="my-card bg-brown text-white q-px-md q-py-sm"
          @click="modal = true"
        >
          <div class="text-subtitle2">{{ tituloAtivo }}</div>
        </q-card>

        <q-dialog v-model="modal">
          <q-card class="bg-brown text-white">
            <q-card-section>
              <div class="text-h6">Titulos</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll-y">
              <div
                v-for="achievement in filteredAchievements"
                :key="achievement.id"
                style="min-width: 50vh"
                @click="updateTitulo(achievement.nome)"
              >
                <div class="cursor-pointer q-hoverable">
                  <div class="text-h6">{{ achievement.nome }}</div>
                  <div class="text-subtitle2">{{ achievement.descricao }}</div>
                </div>
                <q-separator dark />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

        <div>
          <img
            class="no-pointer-events bopanim"
            alt="Click the Shrimp"
            :src="roupaAtiva"
            :style="{ width: shrimpAnimate }"
          />
        </div>
        <div>
          <h2>PlanktonCoins: {{ displayPoints.number.toFixed(0) }}</h2>
        </div>
      </div>
      <div>
        <Transition>
          <router-view />
        </Transition>
      </div>
    </div>

    <q-dialog v-model="tituloAward" seamless position="bottom">
      <q-card style="width: 350px" class="bg-brown text-white">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-h6 text-orange"> NOVO TITULO DESBLOQUEADO! </div>
            <div class="text-weight-bold">{{ newTitulo }}</div>
            <div class="text-white">{{ newSubtitulo }}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
// import {gsap} from 'gsap'

import { ref, reactive, computed, onMounted, watch } from "vue";
import { usePlayerStore } from "../stores/player-store.js";
import { useStructureStore } from "../stores/structures-store.js";
import { useRoupasStore } from "../stores/roupas-store.js";
import { useAchievementsStore } from "../stores/achievements-store.js";

export default {
  setup() {
    const playerStore = usePlayerStore();
    const structureStore = useStructureStore();
    const roupasStore = useRoupasStore();
    const achievementsStore = useAchievementsStore();

    const achievements = computed(() => achievementsStore.achievements);
    const filteredAchievements = ref(
      achievements.value.filter((achiv) => {
        if (achiv.obtido == 1) {
          return achiv;
        }
      })
    );

    const displayPoints = reactive({
      number: 0,
    });

    const modal = ref(false);
    const tituloAward = ref(false);
    const newTitulo = ref("");
    const newSubtitulo = ref("");

    const shrimpAnimate = ref("300px");
    const currentPoints = computed(() => playerStore.points);

    const updateTitulo = (text) => {
      modal.value = false;
      achievementsStore.tituloAtivo = text;
    };

    const clickRegister = () => {
      playerStore.pointAdd(1);
      shrimpAnimate.value = "250px";
      setTimeout(() => {
        shrimpAnimate.value = "300px";
      }, 100);
    };

    const cpsUpdate = (amount) => {
      playerStore.pointAdd(structureStore.totalCps);
      achievementsStore.checkForUnlocks();

      filteredAchievements.value = achievements.value.filter((achiv) => {
        if (achiv.obtido == 1) {
          return achiv;
        }
      });
    };

    onMounted(() => {
      let cpsCheck = setInterval(cpsUpdate, 1000);
    });

    watch(
      filteredAchievements,
      async (newFilteredAchievements, oldFilteredAchievements) => {
        let diff = newFilteredAchievements.filter(
          (x) => !oldFilteredAchievements.includes(x)
        );

        console.log(diff);
        if (diff[0]) {
          tituloAward.value = true;

          newTitulo.value = diff[0].nome;
          newSubtitulo.value = diff[0].descricao;

          setTimeout(() => {
            tituloAward.value = false;
          }, "8000");
        }
      }
    );

    watch(currentPoints, async (newPoints) => {
      displayPoints.number = newPoints;
    });

    return {
      roupaAtiva: computed(() => roupasStore.roupaAtiva),
      bgImage: computed(() => roupasStore.bgAtiva),
      tituloAtivo: computed(() => achievementsStore.tituloAtivo),
      shrimpAnimate,
      clickRegister,
      displayPoints,
      filteredAchievements,
      updateTitulo,

      newTitulo,
      newSubtitulo,

      modal,
      tituloAward,
    };
  },
};
</script>

<style scoped>
.bopanim {
  transition: 0.3s width ease;
}
.bgimg {
  background-size: cover;
  background-repeat: no-repeat;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
