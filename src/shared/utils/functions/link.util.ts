import LanguageDocument from "types/shared/services/language";
import {AppDataDocument} from "types/client/app/pageProps";

export default {
    home(data: AppDataDocument) {
        return data.apiPath.website.base;
    },
    language(language: LanguageDocument) {
        return `${language.shortKey}-${language.locale}`;
    },
    target(data: AppDataDocument, target: string) {
        let path = `${data.apiPath.website.base}`;
        const language = data.languages.findSingle("_id", data.cookies.languageId || "");
        if (language) {
            path = `${data.apiPath.website.base}/${this.language(language)}`;
        }

        if (
            target.search("/") > -1 ||
            (target.search("/") === -1 && target.search("#") === -1)
        ) {
            target = `/${target}`;
        }

        path += target;

        return path;
    },
    changeLanguage(apiPath: AppDataDocument["apiPath"], language: LanguageDocument, languageKeyWithLocale: AppDataDocument["languageKeyWithLocale"]) {
        let path = "";
        if(language){
            path = `${apiPath.website.base}/${this.language(language)}${apiPath.website.originalUrl}`.replace(/\/$/, "");
            if (languageKeyWithLocale) {
                path = apiPath.website.full.replace(languageKeyWithLocale, this.language(language))
            }
        }
        return path;
    }
}