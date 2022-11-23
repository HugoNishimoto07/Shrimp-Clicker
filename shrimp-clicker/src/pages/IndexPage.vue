<template>
  <q-page>
    <div 
      class="full-width fit row justify-between bgimg"
      :style="{ 'background-image': 'url(' + bgImage + ')' }"
    >
      <div 
        style="overflow: auto; min-width: 60%; max-width: 60%;" 
        class="center non-selectable"
        @click="clickRegister()"
      >
        <div>
          <img
            class="no-pointer-events bopanim"
            alt="Click the Shrimp"
            :src="roupaAtiva"
            :style="{ width: shrimpAnimate }"
          >
        </div>
        <div>
          <h2> PlanktonCoins: {{displayPoints.number.toFixed(0)}} </h2>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
import {gsap} from 'gsap'

import { ref, reactive, computed, onMounted, watch } from 'vue'
import { usePlayerStore } from '../stores/player-store.js'
import { useStructureStore } from '../stores/structures-store.js'
import { useRoupasStore } from '../stores/roupas-store.js'

export default {
  setup () {
    const playerStore = usePlayerStore()
    const structureStore = useStructureStore()
    const roupasStore = useRoupasStore()

    const displayPoints = reactive({
      number: 0
    })

    const shrimpAnimate = ref("300px")
    const currentPoints = computed(() => playerStore.points)

    const clickRegister = () => {
      playerStore.pointAdd(1)
      shrimpAnimate.value = "250px"
      setTimeout(() => {
        shrimpAnimate.value = "300px"
      }, 100)
    }

    const cpsUpdate = (amount) => {
      console.log, 1000, "structureStore.totalCps"
      playerStore.pointAdd(structureStore.totalCps)
    }

    onMounted(() => {
      let cpsCheck = setInterval(cpsUpdate, 1000)
    })

    watch(currentPoints, (newPoints) => {
      var variation = displayPoints.number - newPoints 

      if ( variation > 1 || variation < -1) {
        gsap.to(displayPoints, { duration: 0.5, number: Number(newPoints) || 0 })
      } else {
        displayPoints.number = newPoints
      }
    })

    return {
      roupaAtiva: computed(() => roupasStore.roupaAtiva),
      bgImage: computed(() => roupasStore.bgAtiva),
      shrimpAnimate,
      clickRegister,
      displayPoints,
    }
  }

}
</script>


<style scoped>
.bopanim {
  transition: 0.3s width ease;
}
.bgimg{
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
</style>