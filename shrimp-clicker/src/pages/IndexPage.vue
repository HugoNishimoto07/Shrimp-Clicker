<template>
  <q-page>
    <div 
      class="full-width fit row justify-between"
    >
      <div style="overflow: auto; min-width: 60%; max-width: 60%;" class="debug">
        <div>
          <img
            class="shrimp"
            alt="Click the Shrimp"
            src="~assets/shrimp_1f990.png"
          >
        </div>
        <div>
          <h2> PlanktonCoins: NULL </h2>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
}
</script>


<style scoped>
.debug {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80vh;
}
</style>