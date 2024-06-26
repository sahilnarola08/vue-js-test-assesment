<template>
    <div class="bg-white shadow rounded-md ">
        <div class="p-4 w-8/12 m-auto align-center flex space-x-4">
            <div class="w-1/4  mt-3 block  bg-white  ">
                <button type="button"
                    class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl shadow bg-gray-100"
                    data-accordion-target="#accordion-collapse-body-1" aria-expanded="true"
                    aria-controls="accordion-collapse-body-1">
                    <span>Custom Link</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5 5 1 1 5" />
                    </svg>
                </button>
                <div class="p-5 border border-b-1 border-gray-200 dark:border-gray-700 rounded-b-xl shadow hover:bg-gray-100">
                    <input type="text" v-model="formData.URL" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="URl" required />
                    <div class="mb-2" v-for="error of v$.URL.$errors" :key="error.$uid">
                        <div class="text-red-500">{{ error.$message }}</div>
                    </div>
                    <input type="text" v-model="formData.Label" id="first_name"
                        class="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Label" required />
                    <div class="mb-2" v-for="error of v$.Label.$errors" :key="error.$uid">
                        <div class="text-red-500">{{ error.$message }}</div>
                    </div>
                    <div class="flex justify-end mt-2">
                        <button @click="AddMenu" type="button"
                            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add
                            Item</button>
                    </div>
                </div>
                <ul class="space-y-1.5 mt-3 border rounded-lg">
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
                            <svg :class="item.showSideDropDown ? 'rotate-180' : 'rotate-0'"
                                class="hs-accordion-active:hidden ms-auto block size-4  text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
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

                                        <svg v-if="child?.children?.length > 0 && child.showSideDropDown"
                                            class="hs-accordion-active:block ms-auto  size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="m18 15-6-6-6 6" />
                                        </svg>

                                        <svg v-else-if="child?.children?.length > 0"
                                            class="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>

                                    <div v-if="child?.children?.length > 0 && child.showSideDropDown"
                                        id="users-accordion-sub-1"
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
            <a href="#" class="my-3 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Menu</h5>
                <p class="text-gray-600 mb-4">Place each item in the order you prefer. Click on the arrow to the
                    right
                    of the item to display more configuration options.</p>
                <div class="mt-4 ">
                    <div class="flex justify-between">
                        <nested-draggable @callEmit="callFun" v-model="ListStore.List" class="w-full"></nested-draggable>
                        <preview-list :list="ListStore.List" />
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch  , computed} from 'vue'
import { useListStore } from '@/stores/List'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { initFlowbite } from 'flowbite'
import NestedDraggable from '../NestedComponent.vue'
const ListStore = useListStore()

const formData = ref<{ Label: string, URL: string }>({
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
const callFun = () => {
    var data = ListStore.List
    data.forEach((item: any) => {
        item.status = "PERENT"; 
        item.children.forEach((child: any) => {
            child.status = "CHILD";
            child.children.forEach((subchild: any) => {
                subchild.status = "SUBCHILD";
                removeStatus(subchild); 
            });
        });
    });
    ListStore.giveValue(data);
}

watch(ListStore.List, (newX) => {
    callFun()
}, { deep: true });  // Added { deep: true } to ensure deep reactive watching

const removeStatus = (val: any) => {
    val?.children.forEach((item: any) => {
        item.status = "";
        removeStatus(item)
    })
}

const show = ref(true)
onMounted(() => {
    ListStore.reloadGrid()
    initFlowbite();
})
const v$ = useVuelidate(rules, formData.value)
const AddMenu = () => {
    v$.value.$validate();
    if (v$.value.$invalid) return;

    const data = ListStore.addData('', {
        label: formData.value.Label,
        show: false,
        ClassInput: '',
        Url: formData.value.URL,
        children: [],
        status: 'PERENT'
    }, "PERENT");

    if (data) {
        formData.value = {
            Label: '',
            URL: ''
        };
        v$.value.$reset();
    }
}

</script>