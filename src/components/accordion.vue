<template>
    <div :class="className"  data-accordion="collapse" class="border border-gray-200 rounded-lg m-1"
        data-active-classes="dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2>
            <button @click="call" type="button"
                class="flex handle  items-center justify-between w-full py-2 px-2 font-medium rtl:text-right text-gray-500 gap-3 block p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                <span>{{ item?.label }}</span>
                <div class="flex items-center">
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5 5 1 1 5" />
                    </svg>
                </div>
            </button>
        </h2>
        <div v-if="show">
            <div class="py-5">
                <slot></slot>
            </div>
        </div>
    </div>
    
</template>
<script setup lang="ts">
const props = defineProps(['item','ariaExpanded', 'className','show'])
const emit = defineEmits(['toggle'])
const call = () => {
    emit('toggle')
}
</script>