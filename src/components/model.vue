<template>
    <div v-if="show" class="fixed top-0 right-0 left-0 bottom-0 z-40 flex justify-center items-center">
      <div class="fixed top-0 right-0 left-0 bottom-0 bg-gray-500 opacity-50"></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div class="flex items-center justify-between p-4 md:px-5 py-2 border-b rounded-t dark:border-gray-600">
            <div>
              <h4 class="font-semibold text-gray-600 dark:text-gray-300">Add Sub Menu</h4>
            </div>
            <button @click="closeModal" type="button"
              class="bg-transparent bg-gray-200 text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
<script setup lang="ts">
const props = defineProps(['show'])
const emit = defineEmits(['closeModel'])
const closeModal = () => {
    emit('closeModel')
}
</script>