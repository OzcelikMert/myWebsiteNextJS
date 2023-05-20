import Api from "./api";
import {ServicePages} from "constants/index";
import {LanguageGetResultDocument, LanguageGetOneParamDocument, LanguageGetManyParamDocument} from "types/services/language";

export default {
    getOne(params: LanguageGetOneParamDocument){
        return Api.get<LanguageGetResultDocument | null>({
            url: [ServicePages.language, "one"],
            data: params
        });
    },
    getMany(params: LanguageGetManyParamDocument) {
        return Api.get<LanguageGetResultDocument[]>({
            url: [ServicePages.language, "many"],
            data: params
        });
    },
}