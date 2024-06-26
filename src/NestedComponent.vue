<template>
  <VueDraggable @start="callEmit" tag="ul" v-model="list" group="g1">
    <li v-for="(el,index) in modelValue" :key="el.name">
      <Accordion @toggle="el.show = !el.show" :show="el.show" className="w-3/4"
        :ariaExpanded="index == 0 ? true : false" :item="el" :Id="`p${index}`">
        <Common @expand="el.show = false" :btn="true" :inputData="el" />
      </Accordion>
      <nested-component v-model="el.children" className="ml-10 bg-white-300 p-2" />
    </li>
  </VueDraggable>
</template>
<script setup lang="ts">
import { computed, ref  } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

interface IList {
  name: string
  show:boolean,
  status: any,
  children: IList[]
}

interface Props {
  modelValue: IList[]
}


const props = defineProps<Props>()
interface Emits {
  (e: 'update:modelValue', value: IList[]): void
  (e: 'callEmit'): void
}
const callEmit = () => {
  emits("callEmit")
}
const emits = defineEmits<Emits>()
const list = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value)
})
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
}
</style>