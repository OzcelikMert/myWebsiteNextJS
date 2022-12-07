import LanguageDocument from "types/services/language";
import {AppDataDocument} from "types/client/app/pageProps";

export default {
    home(data: AppDataDocument) {
        return data.apiPath.website.base;
    },
    language(language: LanguageDocument) {
        return `${language.shortKey}-${language.locale}`;
    },
    languageUpperLocale(language: LanguageDocument) {
        return `${language.shortKey}_${language.locale.toUpperCase()}`;
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
    changeLanguage(appData: AppDataDocument, language: LanguageDocument) {
        let path = "";
        if(appData.languageId != appData.settings.defaultLangId) {
          path = appData.apiPath.website.full.replace(appData.languageKeyWithLocale ?? "", this.language(language))
        } else {
            path = `${appData.apiPath.website.base}/${this.language(language)}${appData.apiPath.website.originalUrl}`.replace(/\/$/, "");
        }
        return path;
    }
}