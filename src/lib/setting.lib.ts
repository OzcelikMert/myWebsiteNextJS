import {IncomingMessage} from "http";
import settingService from "services/setting.service";
import Variable from "library/variable";

export default {
    async set(req: IncomingMessage) {
        req.appData.settings = (await settingService.get({
            ...(req.appData.languageId ? {langId: req.appData.languageId} : {})
        })).data[0];
    },
    async setDefaultLanguageId(req: IncomingMessage) {
        req.appData.settings = (await settingService.get({onlyDefaultLanguageId: true})).data[0];
        if(Variable.isEmpty(req.appData.languageId)){
            req.appData.languageId = req.appData.settings.defaultLangId;
        }
    },
};