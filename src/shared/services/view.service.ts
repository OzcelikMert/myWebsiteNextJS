import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import {
    ViewAddParamDocument
} from "types/shared/services/view";

export default {
    add(params: ViewAddParamDocument) {
        return Api.post({
            url: [ServicePages.view],
            data: params,
        });
    }
}