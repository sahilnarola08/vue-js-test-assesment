<template>
  <div class="text-center">
    <h1 class="text-3xl mt-4">Test Task Nested Menu</h1>
  </div>
  <RouterView />
  <!-- <div class="flex justify-between">
    <nested-draggable v-model="list" class="w-full"></nested-draggable>
    <preview-list :list="list" />
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NestedDraggable from './NestedComponent.vue'

const list = ref([
  {
    name: 'item 1',
    children: [
      {
        name: 'item 2',
        children: []
      }
    ]
  },
  {
    name: 'item 3',
    children: [
      {
        name: 'item 4',
        children: []
      }
    ]
  },
  {
    name: 'item 5',
    children: []
  }
])
// const list = ref(JSON.parse(localStorage.getItem('list') || '[]'))
</script>