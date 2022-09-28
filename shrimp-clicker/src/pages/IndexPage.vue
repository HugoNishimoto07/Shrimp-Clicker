<template>
  <q-page>
    <div 
      class="full-width fit row justify-between"
    >
      <div 
        style="overflow: auto; min-width: 60%; max-width: 60%;" 
        class="center non-selectable"
        @click="clickRegister()"
      >
        <div style="width: 200px height: 200px">
          <img
            class="no-pointer-events bopanim"
            alt="Click the Shrimp"
            src="~assets/shrimp_1f990.png"
            :style="{ width: shrimpAnimate }"
          >
        </div>
        <div>
          <h2> PlanktonCoins: {{Math.ceil(points)}} </h2>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { usePlayerStore } from '../stores/player-store.js'
import { useStructureStore } from '../stores/structures-store.js'

export default {
  setup () {
    const playerStore = usePlayerStore()
    const structureStore = useStructureStore()
    const shrimpAnimate = ref("200px")

    const clickRegister = () => {
      playerStore.pointAdd(1)
      shrimpAnimate.value = "170px"
      setTimeout(() => {
        shrimpAnimate.value = "200px"
      }, 100)
    }

    const cpsUpdate = (amount) => {
      console.log, 1000, "structureStore.totalCps"
      playerStore.pointAdd(structureStore.totalCps)
    }

    onMounted(() => {
      let cpsCheck = setInterval(cpsUpdate, 1000)
    })

    return {
      points: computed(() => playerStore.points),
      shrimpAnimate,
      clickRegister
    }
  }

}
</script>


<style scoped>
.bopanim {
  transition: 0.3s width ease;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80vh;
}
</style>