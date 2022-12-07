import Api from "./api";
import {ServicePages} from "constants/index";
import ServiceResultDocument from "types/services/api/result";
import SettingsDocument, {
    SettingGetParamDocument
} from "types/services/setting";

export default {
    get(params: SettingGetParamDocument): Promise<ServiceResultDocument<SettingsDocument[]>> {
        return Api.get({
            url: [ServicePages.setting],
            data: params,
        });
    }
}