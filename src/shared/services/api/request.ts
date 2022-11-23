import {ErrorCodes, Timeouts} from "../../utils/ajax";
import {ApiRequestParamDocument} from "types/shared/services/api";
import ServiceResultDocument from "types/shared/services/api/result";
import pathUtil from "shared/utils/path.util";
const fetch = require("cross-fetch");

class ApiRequest {
    constructor(params: ApiRequestParamDocument) {
        this.params = params;
        this.result = {
            data: [],
            customData: null,
            status: true,
            message: "",
            errorCode: ErrorCodes.success,
            statusCode: 200,
            source: ""
        };
    }

    private params: ApiRequestParamDocument;
    private result: ServiceResultDocument<any>;

    private getApiUrl() {
        let apiUrl = pathUtil.api;
        this.params.url.forEach(url => {
            if(url) {
                apiUrl += url + "/";
            }
        })
        console.log(apiUrl)
        return apiUrl.removeLastChar();
    }

    private request(resolve: (value: any) => void) {
        let config: any = {
            method: this.params.method,
            body: JSON.stringify(this.params.data),
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }
        let url = this.getApiUrl();

        if(config.method === "GET"){
            delete config.body;
            url = `${url}?${Object.entries(this.params.data || {}).map(e => e.join('=')).join('&')}`
        }

        try {
            fetch(url, config)
                .then((response: any) => response.json())
                .then((response: any) => {
                    resolve(response);
                });
        }catch (e) {
            console.log(e);
            this.result.status = false;
            this.result.customData = e;
            resolve(this.result);
        }

    }

    init() : Promise<ServiceResultDocument<any>> {
        return new Promise( async resolve => {
            await this.request(resolve);
        })
    }
}

export default ApiRequest;