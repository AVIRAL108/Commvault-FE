import { requestHandler } from "../middleware/requesthandler"


export const postData = (config, method, type, uri, isFormData, id, values ) => {
    const payload = values;
    return requestHandler({
        config,
        method,
        payload: payload,
        type,
        url: uri,
        id
    })
}


export const getData = (config, method, type, uri, name) => {
    return requestHandler({
        name,
        config,
        method,
        type,
        url: uri
    })
}

