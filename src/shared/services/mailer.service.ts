import Api from "./api";
import {ServicePages} from "../constants";
import {MailerPostParamDocument} from "types/shared/services/mailer";

export default {
    post(params: MailerPostParamDocument) {
        return Api.post({
            url: [ServicePages.mailer],
            data: params,
        });
    }
}