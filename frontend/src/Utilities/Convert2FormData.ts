import React, {useState} from "react";

function Convert2FormData(){
    const [formData, setFormData] = useState(new FormData())

    const convertArrayOfObjectsToFormData = (arr: Object[]) => {
        const newFormData = new FormData();
        arr.forEach((obj) => {
            for(const [key, val] of Object.entries(obj)){
                let fieldName: string
                if(Array.isArray(val)){
                    val.forEach((item, index) => {
                        fieldName = `${key}[${index}]`
                        formData.append(fieldName, item)
                    })
                }else{
                    fieldName = key
                    formData.append(fieldName, val)
                }
            }

        });
        setFormData(newFormData)
    }
    return {formData, Convert2FormData};
}

export default Convert2FormData;