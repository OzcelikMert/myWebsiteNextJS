import {ApiRequestParamDocument} from "types/services/api";
import ServiceResultDocument from "types/services/api/result";
import ApiRequest from "./request";

const Api = {
    get(params: ApiRequestParamDocument): Promise<ServiceResultDocument<any>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "GET",
                async: true,
            }).init().then(resData => {
                resolve(resData)
            })
        });
    },
    post(params: ApiRequestParamDocument): Promise<ServiceResultDocument<any>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "POST",
                async: true,
            }).init().then(resData => {
                resolve(resData)
            })
        });
    },
    put(params: ApiRequestParamDocument): Promise<ServiceResultDocument<any>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "PUT",
                async: true,
            }).init().then(resData => {
                resolve(resData)
            })
        })
    },
    delete(params: ApiRequestParamDocument): Promise<ServiceResultDocument<any>> {
        return new Promise(resolve => {
            new ApiRequest({
                ...params,
                method: "DELETE",
                async: true,
            }).init().then(resData => {
                resolve(resData)
            })
        });
    }
}

export default Api;