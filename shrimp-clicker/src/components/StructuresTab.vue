<template>
  <div
    class=""
    style="display: flex; flex-direction: column; width: 350px; height: 89vh"
  >
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Estruturas</q-toolbar-title>
    </q-toolbar>

    <q-list bordered class="bg-light-blue-1">
      <q-item
        v-for="structure in structures"
        :key="structure.id"
        :disable="!enoughToBuy(getCostById(structure.id))"
        :class="{
          'no-pointer-events': !enoughToBuy(getCostById(structure.id)),
        }"
        clickable
        class="q-my-sm"
        v-ripple
        @click="purchaseStructure(structure.id, getCostById(structure.id))"
      >
        <q-item-section avatar class="no-pointer-events">
          <q-avatar>
            <img :src="structure.icone" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="non-selectable">
          <q-item-label>{{ structure.nome }}</q-item-label>
          <q-item-label caption lines="1">{{
            `Custo: ${getCostById(structure.id)}`
          }}</q-item-label>
          <q-item-label caption lines="1">{{
            `quantidade atual: ${structure.purchases}`
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="attach_money"
            :color="enoughToBuy(getCostById(structure.id)) ? 'green' : 'grey'"
          />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item
        :disable="!enoughToBuy(250)"
        :class="{ 'no-pointer-events': !enoughToBuy(250) || isca }"
        clickable
        class="q-my-sm"
        v-ripple
        @click="lagosta"
      >
        <q-item-section avatar class="no-pointer-events">
          <q-avatar>
            <img src="https://people.stfx.ca/rsg/gbayesp/graphics/LOBTRP.JPG" />
          </q-avatar>
        </q-item-section>
        <q-item-section class="non-selectable">
          <q-item-label>Isca de lagosta </q-item-label>
          <q-item-label caption lines="1">{{ `Custo: 250` }}</q-item-label>
          <q-item-label caption lines="1">{{ `duração: 1 min` }}</q-item-label>
          <q-linear-progress
            :value="lagostaTime"
            stripe
            size="xl"
            color="pink"
            :animation-speed="lagostaSpeed"
            class="q-pt-md"
          >
            <div class="absolute-full flex flex-center">
              <div class="text-black">ISCA DE LAGOSTA</div>
            </div>
          </q-linear-progress>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-pa-md q-gutter-sm" style="height: 80px">
      <q-avatar
        v-for="(purchase, index) in purchaseList"
        :key="index"
        size="40px"
        class="overlapping"
        :style="`left: ${index * 25}px`"
      >
        <img :src="purchase" />
      </q-avatar>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStructureStore } from "../stores/structures-store.js";
import { usePlayerStore } from "../stores/player-store.js";

export default {
  setup() {
    const structureStore = useStructureStore();
    const playerStore = usePlayerStore();

    const lagostaTime = ref(0);
    const lagostaSpeed = ref(500);
    const isca = ref(false);

    const lagosta = () => {
      playerStore.pointDecrement(250);
      isca.value = true;

      lagostaTime.value = 1;
      structureStore.setLP(30)

      setTimeout(() => {
        lagostaSpeed.value = "60000";
        lagostaTime.value = 0;

        setTimeout(() => {
          structureStore.setLP(120)
          isca.value = false;
          lagostaSpeed.value = "500";
        }, "60000");
      }, "1000");
    };

    const enoughToBuy = (cost) => {
      return playerStore.points >= cost;
    };

    const purchaseStructure = (id, cost) => {
      structureStore.addStructure(id);
      playerStore.pointDecrement(cost);
    };

    return {
      enoughToBuy,
      purchaseStructure,
      structures: computed(() => structureStore.structures),
      getCostById: structureStore.getCostById,
      addStructure: structureStore.addStructure,
      purchaseList: computed(() => structureStore.purchaseList),
      lagosta,
      lagostaTime,
      lagostaSpeed,
      isca
    };
  },
};
</script>

<style scoped>
.overlapping {
  position: absolute;
  bottom: 15px;
}
</style>
