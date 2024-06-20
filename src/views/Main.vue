<template>
    <div class="bg-white shadow rounded-md">
        <div class="p-4 w-8/12 m-auto align-center flex space-x-4">
            <div class="w-1/4">
                <Accordion :item="{ label: 'Custom Link' }" :Id="0" @toggle="show = !show" :show="show">
                    <div class="flex justify-around items-center ">
                        <label for="url" class="mr-2 w-1/12">URL</label>
                        <input type="text" id="url" class="border border-gray-300 py-0 px-4"
                            v-model="formData.URL">
                    </div>
                    <div class="input-errors mb-2" v-for="error of v$.URL.$errors" :key="error.$uid">
                        <div class="ml-[72px] error-msg text-red-500">{{ error.$message }}</div>
                    </div>
                    <div class="flex justify-around items-center mt-2">
                        <label for="label" class="mr-2 w-1/12">Label</label>
                        <input type="text" id="label" class="border border-gray-300 py-0 px-4" v-model="formData.Label">
                    </div>
                    <div class="input-errors mb-2 mt-2" v-for="error of v$.Label.$errors" :key="error.$uid">
                        <div class="ml-[72px] error-msg text-red-500">{{ error.$message }}</div>
                    </div>
                    <div class="flex justify-end">
                        <button @click="AddMenu" class="mt-4 mr-3 pr-2 px-2 py-1 border border-gray-700 ">
                            Add menu item
                        </button>
                    </div>
                </Accordion>
                <ul class="space-y-1.5">
                    <li v-for="item in ListStore.List" class="hs-accordion" id="users-accordion">
                        <button type="button" @click="item.showSideDropDown = !item.showSideDropDown"
                            class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white">
                            <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            {{ item.label }}
                            <svg :class="item.showSideDropDown ? 'rotate-180' : 'rotate-0'" class="hs-accordion-active:hidden ms-auto block size-4  text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        <div v-if="item.showSideDropDown" id="users-accordion"
                            class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
                            <ul class="hs-accordion-group ps-3 pt-2" data-hs-accordion-always-open>
                                <li v-for="child in item.children" class="hs-accordion" id="users-accordion-sub-1">
                                    <button type="button" @click="child.showSideDropDown = !child.showSideDropDown"
                                        class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white">
                                        {{ child.label }}

                                        <svg v-if="child?.children?.length > 0 && child.showSideDropDown" class="hs-accordion-active:block ms-auto  size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>

                                        <svg v-else-if="child?.children?.length > 0" class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>

                                    <div v-if="child?.children?.length > 0 && child.showSideDropDown" id="users-accordion-sub-1"
                                        class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ">
                                        <ul class="pt-2 ps-2">
                                            <li v-for="subchild in child.children">
                                                <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300"
                                                    href="#">
                                                    {{ subchild.label }}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="w-3/4 border border-gray-200">
                <div class="flex justify-between bg-[#d9d9d9] px-4 items-center py-2">
                    <div>
                        <label for="name" class="mr-2">Menu</label>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Menu Structure</h3>
                    <p class="text-gray-600 mb-4">Place each item in the order you prefer. Click on the arrow to the
                        right
                        of the item to display more configuration options.</p>
                    <div class="p-4">
                        <VueDraggable v-model="ListStore.List" group="g1">
                            <div v-for="(item, index) in ListStore.List">
                                <Accordion  @toggle="item.show = !item.show" :show="item.show" className="w-3/4"
                                    :ariaExpanded="index == 0 ? true : false" :item="item" :Id="`p${index}`">
                                    <Common @expand="item.show = false" :btn="true" :inputData="item" />
                                </Accordion>
                                <VueDraggable  v-model="item.children" group="g2">
                                    <div v-for="(child, cindex) in item.children">
                                        <Accordion v-if="child" @toggle="child.show = !child.show" :show="child.show"
                                            className="ml-10 w-3/4" :ariaExpanded="false" :item="child"
                                            :Id="`c${cindex}`">
                                            <Common @expand="child.show = false" :btn="true" :inputData="child" />
                                        </Accordion>
                                        <VueDraggable v-if="child.children?.length > 0" v-model="child.children" group="g3">
                                            <div v-for="(subchild, sindex) in child.children">
                                                <Accordion  v-if="subchild"   @toggle="subchild.show = !subchild.show"
                                                    :show="subchild.show" className="ml-20 w-3/4" :ariaExpanded="false"
                                                    :item="subchild" :Id="`s${sindex}`">
                                                    <Common @expand="subchild.show = false" :btn="false" :inputData="subchild" />
                                                </Accordion>
                                            </div>
                                        </VueDraggable>
                                    </div>
                                </VueDraggable>
                            </div>
                        </VueDraggable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref , onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useListStore } from '@/stores/List'
import { useVuelidate } from '@vuelidate/core'
import { required , helpers } from '@vuelidate/validators'
const formData = ref<{Label: string,URL:string}>({
    Label: '',
    URL: ''
})
const rules = {
    Label: {
        required: helpers.withMessage('This Label cannot be empty', required)
    },
    URL: {
        required: helpers.withMessage('This URL cannot be empty', required)
    },
};

const ListStore = useListStore()
const show = ref(true)
onMounted(() => {
    ListStore.reloadGrid()
})
const v$ = useVuelidate(rules, formData.value)
const AddMenu = () => {
    v$.value.$validate()
    if(v$.value.$invalid) return
    const data = ListStore.addData({ label: formData.value.Label, show: false, ClassInput: '', Url: formData.value.URL,children: []})
    if(data){
        formData.value = {
            Label: '',
            URL: ''
        }
        v$.value.$reset()
    }
    
}
</script>