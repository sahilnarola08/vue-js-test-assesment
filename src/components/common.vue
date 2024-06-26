<template>
    <div class="flex justify-end">
        <button v-if="inputData.status == 'PERENT' || inputData.status == 'CHILD'" @click="opneModel" class="mr-3 pr-2 px-2 py-1 border border-gray-700 rounded-lg">
            Add Sub Item
        </button>
    </div>
    <div class="px-4 flex space-x-4 items-center">
        <div class="flex flex-col w-full">
            <label for="Lable">
                Label
            </label>
            <input type="text" v-model="inputData.label" id="Label" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Label" required />
        </div>
        <div class="flex flex-col w-full">
            <label for="ClassInput">
                Class CSS (optional)
            </label>
            <input type="text" v-model="inputData.ClassInput" id="ClassInput" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Class Input" required />
        </div>
    </div>
    <div class="flex px-4 mt-2 flex-col">
        <label for="URl">
            Url
        </label>
        <input type="text" v-model="inputData.Url" id="URl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL" required />
    </div>
    <div class="px-4  mt-3">
        <button  @click="DeleteData" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Delete</button> 
        <button @click="emit('expand')" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md ml-2 text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
    </div>
    <Model @closeModel="Close()" :show="show">
       <div class="p-2">
            <div class="mx-2">
                <label for="URL" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                <input type="text" v-model="formData.URL" id="URL" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL" required />
            </div>
            <div class="input-errors mb-2" v-for="error of v$.URL.$errors" :key="error.$uid">
                <div class="ml-2 error-msg text-red-500">{{ error.$message }}</div>
            </div>
            <div class="mx-2">
                <label for="Label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                <input type="text" v-model="formData.Label" id="Label" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Label" required />
            </div>
            <div class="input-errors mb-2" v-for="error of v$.Label.$errors" :key="error.$uid">
                <div class="ml-2 error-msg text-red-500">{{ error.$message }}</div>
            </div>
            <div class="flex justify-end mt-2">
                <button @click="AddMenu" type="button" class="py-2.5 mt-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Save</button>
            </div>
       </div>
    </Model>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useListStore } from '@/stores/List'
import { useVuelidate } from '@vuelidate/core'
import { required , helpers } from '@vuelidate/validators'
const ListStore = useListStore()
const emit = defineEmits(['expand'])
const props = defineProps(['inputData','btn','status'])
const deleteId = ref(props.inputData.label) 
const show = ref(false)
const formData = ref<{Label: string | null,URL:string | null}>({
    Label: null,
    URL: null
})
const rules = {
    Label: {
        required: helpers.withMessage('This Label cannot be empty', required)
    },
    URL: {
        required: helpers.withMessage('This URL cannot be empty', required)
    },
};
const v$ = useVuelidate(rules, formData.value)
const opneModel = () => {
    show.value = true
}
const Close = () => {
    formData.value = {
        Label: null,
        URL: null
    }
    show.value = false
}
const AddMenu = () => {
    v$.value.$validate()
    if(v$.value.$invalid) return
    if(props.inputData.status == "PERENT"){
        const data: any = ListStore.addData(props.inputData?.label,{ status:'CHILD', label: formData.value.Label, show: false, ClassInput: '',showSideDropDown: false, Url: formData.value.URL,children: []},"CHILD")
        if(data){
            Close()
        }
    }else if(props.inputData.status == "CHILD"){
        const data: any = ListStore.addData(props.inputData?.label,{ status:'SUBCHILD', label: formData.value.Label, show: false, ClassInput: '',showSideDropDown: false, Url: formData.value.URL,children: []},"SUBCHILD")
        if(data){
            Close()
        }
    }
    
}
const DeleteData = () => {
    ListStore.removeItemByLabel(ListStore.List,props.inputData?.label)
}
</script>