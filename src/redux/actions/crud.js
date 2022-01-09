import { requestHandler } from "../middleware/requesthandler"


export const postData = (config, method, type, uri, id, values ) => {
    const payload = values;
    return requestHandler({
        config,
        method,
        payload,
        type,
        url: uri,
        id
    })
}


export const getData = (config, method, type, uri, name, queryParams) => {
    return requestHandler({
        name,
        config,
        method,
        type,
        url: uri,
        params :queryParams
    })
}

