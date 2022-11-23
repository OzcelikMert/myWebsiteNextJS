import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import SettingsDocument, {
    SettingGetParamDocument
} from "types/shared/services/setting";

export default {
    get(params: SettingGetParamDocument): Promise<ServiceResultDocument<SettingsDocument[]>> {
        return Api.get({
            url: [ServicePages.setting],
            data: params,
        });
    }
}