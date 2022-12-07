import Api from "./api";
import {ServicePages} from "constants/index";
import ServiceResultDocument from "types/services/api/result";
import {
    SubscriberAddDocument
} from "types/services/subscriber";

export default {
    add(params: SubscriberAddDocument) {
        return Api.post({
            url: [ServicePages.subscriber],
            data: params
        });
    }
}