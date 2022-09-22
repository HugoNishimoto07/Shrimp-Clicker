<template>
  <div class="" style="display:flex; flex-direction: column; width: 350px; height:89vh;">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Estruturas</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
        <q-item 
            v-for="structure in structures" 
            :key="structure.id" 
            class="q-my-sm" 
            clickable 
            v-ripple
            @click="addStructure(structure.id)"
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
          <q-icon name="attach_money" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-space />
        <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Upgrades</q-toolbar-title>
    </q-toolbar>
    <q-list bordered>
      <q-item v-for=" in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>
    </q-list> -->
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStructureStore } from '../stores/structures-store.js'

export default {
  setup () {
    const structureStore = useStructureStore()

    return {
      structures: computed(() => structureStore.structures),
      getCostById: structureStore.getCostById,
      addStructure: structureStore.addStructure
    }
  }
}
</script>