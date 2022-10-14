<template>
  <div class="" style="display:flex; flex-direction: column; width: 350px; height:89vh;">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Estruturas</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
        <q-item 
            v-for="structure in structures" 
            :key="structure.id" 
            :disable= !enoughToBuy(getCostById(structure.id))
            :class="{ 'no-pointer-events': !enoughToBuy(getCostById(structure.id)) }"
            clickable
            class="q-my-sm" 
            v-ripple
            @click="purchaseStructure(structure.id, getCostById(structure.id))"
        >
        <q-item-section avatar class="no-pointer-events">
          <q-avatar>
            <img :src="structure.icone">
          </q-avatar>
        </q-item-section>

        <q-item-section class="non-selectable">
          <q-item-label>{{ structure.nome }}</q-item-label>
          <q-item-label caption lines="1">{{ `Custo: ${getCostById(structure.id)}` }}</q-item-label>
          <q-item-label caption lines="1">{{ `quantidade atual: ${structure.purchases}` }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="attach_money" :color="enoughToBuy(getCostById(structure.id)) ? 'green' : 'grey'" />
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
        <img :src="purchase">
      </q-avatar>
      </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useStructureStore } from '../stores/structures-store.js'
import { usePlayerStore } from '../stores/player-store.js'
  
export default { 
  setup () {
    const structureStore = useStructureStore()
    const playerStore = usePlayerStore()

    const enoughToBuy = (cost) => {
      return (playerStore.points >= cost)
    }
    
    const purchaseStructure = (id, cost) => {
      structureStore.addStructure(id)
      playerStore.pointDecrement(cost)
      console.log(structureStore.purchaseList)
    }

    return {
      enoughToBuy,
      purchaseStructure,
      structures: computed(() => structureStore.structures),
      getCostById: structureStore.getCostById,
      addStructure: structureStore.addStructure,
      purchaseList: computed(() => structureStore.purchaseList)
    }
  }
}
</script>

<style scoped>
  .overlapping {
    position: absolute;
    bottom: 15px;
  }
</style>