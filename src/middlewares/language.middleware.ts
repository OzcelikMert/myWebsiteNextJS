import languageService from "shared/services/language.service";
import {NextRequest, NextResponse} from "next/server";
import linkUtil from "shared/utils/functions/link.util";

export default {
    async set(req: NextRequest) {
        req.appData.languages = (await languageService.get({})).data
    },
    check(req: NextRequest, langKey: string) {
        let languages = req.appData.languages.findMulti("shortKey", langKey.removeLastChar(3));
        let language = languages.findSingle("locale", langKey.slice(3));

        if (language) {
            req.appData.languageId = language._id;
            req.appData.languageKeyWithLocale = linkUtil.language(language);
        }else {
            req.nextUrl.pathname = "/404";
            return false;
        }

        return true;
    },
    checkCookieAndRedirect(req: NextRequest): boolean {
        if (req.appData.cookies.languageId) {
            if (req.appData.settings.defaultLangId != req.appData.cookies.languageId) {
                const language = req.appData.languages.findSingle("_id", req.appData.cookies.languageId);
                if(language) {
                    req.nextUrl.pathname = `/${linkUtil.language(language)}/${req.appData.apiPath.website.originalUrl}`;
                    return false;
                }else {
                    req.nextUrl.pathname = "/404";
                    return false;
                }
            }
        }
        return true;
    },
    checkDefaultLanguage(req: NextRequest): boolean {
        if (req.appData.languageId == req.appData.settings.defaultLangId) {
            req.nextUrl.pathname = req.nextUrl.pathname.replace(`/${req.appData.languageKeyWithLocale}`, "");
            return true;
        }
        return false;
    },
}