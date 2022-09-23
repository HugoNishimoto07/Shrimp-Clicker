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
          <h2> PlanktonCoins: {{points}} </h2>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { usePlayerStore } from '../stores/player-store.js'

export default {
  setup () {
    const playerStore = usePlayerStore()
    const shrimpAnimate = ref("200px")

    const clickRegister = () => {
      playerStore.pointAdd(1)
      shrimpAnimate.value = "170px"
      setTimeout(() => {
        shrimpAnimate.value = "200px"
      }, 100)
    }


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