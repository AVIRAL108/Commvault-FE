import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Endpoints, { Core } from "../configs/endpoints";
import { fileUpload } from "../redux/actions/fileupload";

function useFileUpload(name) {
    const [uploadedFile, setUploadedFile] = useState('');
    const [loading, setLoading] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [ err, setErr ] =  useState("")
    // const handleClose = () =>  setOpen(false) 
    const dispatch  =  useDispatch();
    const handleFileUpload = (e) => {
        if( (e.target.files[0].size)/(1e+6) < 2 ) {
            setLoading(true)
          axios({
            url: `${Core.DOMAIN_UPLOAD}${Endpoints.uploadtoken}`,
            method: "post"
        }).then((res) => {
            if (res.data.status) {
                const token = res.data.data.token;
                const bodyFormData = new FormData();
                bodyFormData.append("PHP_SESSION_UPLOAD_PROGRESS", "progress upload")
                bodyFormData.append("token", token)
                bodyFormData.append("module", "aakashbyjus")
                bodyFormData.append("file[]", e.target.files[0])
                axios({
                    url: `${Core.DOMAIN_UPLOAD}${Endpoints.fileupload}`,
                    method: "post",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: bodyFormData

                }).then((res) => {
                    if(res.data.data[0].status){
                    const url = res.data.data[0].domain + res.data.data[0].path
                    setUploadedFile(url)
                    setLoading(false)
                    dispatch( fileUpload({ [name]: url }))
                    }
                    else  { 
                        alert(res.data.data[0].message)
                        setLoading(false);
                    }
                })
            }
        })
    }
    else { 
        alert("File size should be less than 2MB")
    }
}
    return { loading, uploadedFile, handleFileUpload }


}

export default useFileUpload;