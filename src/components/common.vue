<template>
    <div class="flex justify-end">
        <button v-if="btn" @click="opneModel" class="mr-3 pr-2 px-2 py-1 border border-gray-700 ">
            Add Sub Item
        </button>
    </div>
    <div class="px-4 flex space-x-4 items-center">
        <div class="flex flex-col w-full">
            <label for="Lable">
                Label
            </label>
            <input v-model="inputData.label"  type="text" id="Lable" class="border border-gray-300 py-0 px-4">
        </div>
        <div class="flex flex-col w-full">
            <label for="Class">
                Class CSS (optional)
            </label>
            <input v-model="inputData.ClassInput" type="text" id="Class" class="border border-gray-300 py-0 px-4" />
        </div>
    </div>
    <div class="flex px-4 flex-col">
        <label for="Url">
            Url
        </label>
        <input type="text" id="Url" class="border border-gray-300 py-0 px-4"
        v-model="inputData.Url">
    </div>
    <div class="px-4 pt-1"><a href="javascript:void(0)" @click="DeleteData" class="text-lg text-blue-500">Delete</a> | <button
            class="mt-4 mr-3 pr-2 px-2 py-1 border text-white bg-blue-500 border-blue-700 " @click="emit('expand')">Cancel</button>
    </div>
    <Model @closeModel="Close()" :show="show">
       <div class="p-2">
            <div class="flex justify-around items-center mb-2">
                <label for="url" class="mr-2 w-1/12">URL</label>
                <input type="text" id="url" class="border border-gray-300 py-0 px-4"
                    v-model="formData.URL">
            </div>
            <div class="input-errors mb-2" v-for="error of v$.URL.$errors" :key="error.$uid">
                    <div class="ml-[148px] error-msg text-red-500">{{ error.$message }}</div>
                </div>
            <div class="flex justify-around items-center">
                <label for="label" class="mr-2 w-1/12">Label</label>
                <input type="text" id="label" class="border border-gray-300 py-0 px-4" v-model="formData.Label">
            </div>
            <div class="input-errors mb-2 mt-2" v-for="error of v$.Label.$errors" :key="error.$uid">
                <div class="ml-[148px] error-msg text-red-500">{{ error.$message }}</div>
            </div>
            <div class="flex justify-end">
                <button @click="AddMenu" class="mt-4 mr-3 pr-2 px-2 py-1 border border-gray-700 ">
                    Save
                </button>
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
const props = defineProps(['inputData','btn'])
const deleteId = ref(props.inputData.label) 
const show = ref(false)
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
const v$ = useVuelidate(rules, formData.value)
const opneModel = () => {
    show.value = true
}
const Close = () => {
    show.value = false,
    formData.value = {
        Label: '',
        URL: ''
    }
    v$.value.$reset()
}
const AddMenu = () => {
    var val;
    ListStore?.List.map((x:any) => val = x.children?.includes(props.inputData))
    v$.value.$validate()
    if(v$.value.$invalid) return
    if(props.inputData.hasOwnProperty("children") && !val){
         const data: any = ListStore.addSubData(props.inputData?.label,{ label: formData.value.Label, show: false, ClassInput: '',showSideDropDown: false, Url: formData.value.URL,children: []})
         if(data){
            formData.value = {
                Label: '',
                URL: ''
            }
            Close()
            v$.value.$reset()
        }
    }
    else{
        const data: any = ListStore.addSubChildData(props.inputData?.label,{ label: formData.value.Label, show: false, ClassInput: '',showSideDropDown: false, Url: formData.value.URL,children: []})
        if(data){
            formData.value = {
                Label: '',
                URL: ''
            }
            Close()
            v$.value.$reset()
        }
    }
}
const DeleteData = () => {
    var val;
    ListStore?.List.map((x:any) => val = x.children?.includes(props.inputData))
    if(props.inputData.hasOwnProperty("children") && !val){
        ListStore.deleteData(deleteId.value,'SUBCHILD')
    }
    else{
        ListStore.deleteData(deleteId.value,'CHILD')
    }
}
</script>