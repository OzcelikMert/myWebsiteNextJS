import Api from "./api";
import {ServicePages} from "constants/index";
import {MailerPostParamDocument} from "types/services/mailer";

export default {
    post(params: MailerPostParamDocument) {
        return Api.post({
            url: [ServicePages.mailer],
            data: params,
        });
    }
}