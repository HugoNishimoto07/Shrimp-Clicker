<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/shrimp.png">
          </q-avatar>
          Clicarão
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab to="/login" label="Page One" />
        <q-route-tab to="/purchase" label="Page Two" />
        <q-route-tab to="/achievements" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
  }
}
</script>