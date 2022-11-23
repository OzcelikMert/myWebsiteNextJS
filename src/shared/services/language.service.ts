import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import LanguageDocument, {LanguageGetParamDocument} from "types/shared/services/language";

export default {
    get(params: LanguageGetParamDocument): Promise<ServiceResultDocument<LanguageDocument[]>> {
        return Api.get({
            url: [ServicePages.language],
            data: params
        });
    },
}