import Api from "./api";
import {ServicePages} from "constants/index";
import ServiceResultDocument from "types/services/api/result";
import {
    ViewAddParamDocument
} from "types/services/view";

export default {
    add(params: ViewAddParamDocument) {
        return Api.post({
            url: [ServicePages.view],
            data: params,
        });
    }
}