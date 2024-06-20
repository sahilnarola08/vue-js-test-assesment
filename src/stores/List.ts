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

  function addData(val:any): any {
    const labelExists = List.value?.some((item:any) => item.label.toLowerCase() === val.label.toLowerCase());
    if (!labelExists) {
        List.value = [...List.value,val]
        toast("Data Item Successfully", { autoClose: 1000, type: "success" });
        return true;
    } else {
        toast("Already Added", { autoClose: 1000 , type: "error" });
        return false;
    }
  }
  function addSubData(checkVal:string,val:any) {
    var data;
    List.value.forEach((element:any) => {
      if(element.label == checkVal){
        var labelExists = element.children?.some((item:any) => item.label.toLowerCase() === val.label.toLowerCase());
        if (!labelExists) {
            element.children = [...element.children,val]
            toast("Sub Item Added Successfully", { autoClose: 1000, type: "success" });
            data = true;
        } else {
            toast("Already Added", { autoClose: 1000 , type: "error" });
            data = false;
        }
      }
    });
    return data
  }
  function addSubChildData(checkVal:string,val:any) {
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
  
  function deleteData(checkVal:string,status:string) {
    var data;
    List.value.forEach((element:any) => {
      element.children.forEach((item:any) =>{
        item.children.forEach((x:any) =>{
          if(x.label == checkVal && status == "SUBCHILD"){
            item.children = item.children.filter((x:any) => x.label != checkVal)
            toast("Sub Item Delete Successfully", { autoClose: 1000, type: "success" });
          }
        })
        if(item.label == checkVal && status == "CHILD"){
          element.children = element.children.filter((x:any) => x.label != checkVal)
          toast("Sub Item Delete Successfully", { autoClose: 1000, type: "success" });
        }
      })
    });
    return data
  }

  return { List, addData , addSubData ,addSubChildData, reloadGrid, deleteData}
},
{
  persist: {
    storage: localStorage,
    paths: ['List']
  }
}
)
