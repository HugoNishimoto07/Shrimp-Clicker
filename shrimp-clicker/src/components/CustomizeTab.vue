<template>
  <div class="" style="display:flex; flex-direction: column; width: 350px; height:89vh;">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Estruturas</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
        <q-item 
            v-for="roupa in roupas" 
            :key="roupa.id" 
            :disable= "(!enoughToBuy(roupa.custoInit) && !roupa.comprado)"
            :class="{ 'no-pointer-events': (!enoughToBuy(roupa.custoInit) && !roupa.comprado)}"
            clickable
            class="q-my-sm" 
            v-ripple
            @click="[!roupa.comprado ? purchaseRoupa(roupa.id, roupa.custoInit, roupasStore.roupaAtiva) : roupasStore.roupaAtiva = roupa.imagem]"
        >
        <q-item-section avatar class="no-pointer-events">
          <q-avatar>
            <img :src="roupa.imagem">
          </q-avatar>
        </q-item-section>

        <q-item-section class="non-selectable">
          <q-item-label>{{ roupa.nome }}</q-item-label>
          <q-item-label caption lines="1" v-if="!roupa.comprado">{{ `Custo: ${roupa.custoInit}` }}</q-item-label>
          <q-item-label caption lines="1" v-if="roupa.comprado">{{ `Roupa desbloqueada!` }}</q-item-label>
          <q-item-label caption lines="1" v-else>{{ `Roupa bloqueada` }}</q-item-label>

        </q-item-section>

        <q-item-section side>
          <q-icon name="attach_money" :color="(enoughToBuy(roupa.custoInit) || roupa.comprado) ? 'green' : 'grey'" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoupasStore } from '../stores/roupas-store.js'
import { usePlayerStore } from '../stores/player-store.js'
  
export default { 
  setup () {
    const roupasStore = useRoupasStore()
    const playerStore = usePlayerStore()

    const enoughToBuy = (cost) => {
      return (playerStore.points >= cost)
    }
    
    const purchaseRoupa = (id, cost, imagen) => {
      roupasStore.addRoupa(id)
      playerStore.pointDecrement(cost)
      roupasStore.roupaAtiva = imagen
    }

    return {
      enoughToBuy,
      purchaseRoupa,
      roupasStore,
      roupas: computed(() => roupasStore.roupas)
    }
  }
}
</script>