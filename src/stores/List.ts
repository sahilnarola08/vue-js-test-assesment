import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useListStore = defineStore('List', () => {
  const List = ref([]) as any
  function reloadGrid() {
    List.value.forEach((element:any) => {
      element.show = false
      element.showSideDropDown = false
      element.children.forEach((childElement:any) => {
        childElement.show = false
        childElement.showSideDropDown = false
        childElement.children.forEach((subEhildElement:any) => {
          subEhildElement.show = false
        })
      })
    });
  }
  function giveValue(val:any) {
    List.value = val 
  }
  function addData(checkVal?:string,val?:any,status?:any): any {
    if(status == "PERENT"){
      const labelExists = List.value?.some((item:any) => item.label.toLowerCase() === val.label.toLowerCase());
      if (!labelExists) {
          List.value = [...List.value,val]
          toast("Item Successfully", { autoClose: 1000, type: "success" });
          return true;
      } else {
          toast("Item Already Added", { autoClose: 1000 , type: "error" });
          return false;
      }
    }else if(status == "CHILD"){
      var data;
      List.value.forEach((element:any) => {
        if(element.label == checkVal){
          var labelExists = element.children?.some((item:any) => item.label.toLowerCase() === val.label.toLowerCase());
          if (!labelExists) {
              element.children = [...element.children,val]
              toast("Item Added Successfully", { autoClose: 1000, type: "success" });
              data = true;
          } else {
              toast("Item Already Added", { autoClose: 1000 , type: "error" });
              data = false;
          }
        }
      });
      return data
    }else if(status == "SUBCHILD"){
      var data;
      List.value.forEach((element:any) => {
        element.children.forEach((item:any) =>{
          if(item.label == checkVal){
            var labelExists = item.children?.some((item:any) => item.label.toLowerCase() === val.label.toLowerCase());
            if (!labelExists) {
                item.children = [...item.children,val]
                toast("Sub Item Added Successfully", { autoClose: 1000, type: "success" });
                data = true;
            } else {
                toast("Already Added", { autoClose: 1000 , type: "error" });
                data = false;
            }
          }
        })
      });
      return data
    }
  }
  function removeItemByLabel(arr:any, label:any) {
    console.log(label)
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.label === label) {
        arr.splice(i, 1); 
        return true; 
      }
      if (item.children && item.children.length > 0) {
        const childRemoved = removeItemByLabel(item.children, label);
        if (childRemoved) return true; 
      }
    }
    return false; 
  }

  return { List, addData , reloadGrid, removeItemByLabel,giveValue}
},
{
  persist: {
    storage: localStorage,
    paths: ['List']
  }
}
)
