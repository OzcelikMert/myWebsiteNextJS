import {IncomingMessage} from "http";
import languageService from "shared/services/language.service";

export default {
    async set(req: IncomingMessage) {
        req.appData.languages = (await languageService.get({})).data
    },
    check(req: IncomingMessage) {
        let language = req.appData.languages.findSingle("_id", req.appData.cookies.languageId);
        console.log(req.appData.cookies)
        console.log(language);
        if (language) {
            req.appData.languageId = language._id;
            req.appData.languageKeyWithLocale = `${language.shortKey}-${language.locale}`;
        }
    }
}