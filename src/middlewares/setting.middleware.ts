import settingService from "shared/services/setting.service";
import Variable from "shared/library/variable";
import {NextRequest} from "next/server";

export default {
    async set(req: NextRequest) {
        req.appData.settings = (await settingService.get({})).data[0];
        if(Variable.isEmpty(req.appData.languageId)){
            req.appData.languageId = req.appData.settings.defaultLangId;
        }
        if(Variable.isEmpty(req.appData.cookies.languageId)){
            req.appData.cookies.languageId = req.appData.settings.defaultLangId;
        }
    },
};