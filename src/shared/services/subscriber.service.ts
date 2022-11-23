import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import {
    SubscriberAddDocument
} from "types/shared/services/subscriber";

export default {
    add(params: SubscriberAddDocument) {
        return Api.post({
            url: [ServicePages.subscriber],
            data: params
        });
    }
}