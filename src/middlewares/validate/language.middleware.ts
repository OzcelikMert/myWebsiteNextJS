import Variable from "shared/library/variable";
import {NextRequest, NextResponse} from "next/server";

export default {
    check: async (
        req: NextRequest,
        langKey: string
    ) => {
        let languages = req.preRenderedData.languages.findMulti("shortKey", langKey.removeLastChar(3));
        let language = languages.findSingle("locale", langKey.slice(3));

        if (language) {
            req.preRenderedData.languageId = language._id;
            req.preRenderedData.languageKeyWithLocale = `${language.shortKey}-${language.locale}`;
        }
    },
    checkCookie: async (
        req: NextRequest,
    ) => {
        console.log(req.preRenderedData.cookies)
        if (req.preRenderedData.cookies.languageId) {
            if (req.preRenderedData.languageId != req.preRenderedData.cookies.languageId) {
                const language = req.preRenderedData.languages.findSingle("_id", req.preRenderedData.cookies.languageId);
                if (language) {
                    NextResponse.redirect(req.preRenderedData.apiPath.website.full.replace(
                        req.preRenderedData.apiPath.website.base,
                        `${req.preRenderedData.apiPath.website.base}/${language.shortKey}-${language.locale}`
                    ));
                    return;
                }
            }
        }
    },
    setCookie: async (
        req: NextRequest,
        res: NextResponse
    ) => {
        if (req.preRenderedData.languageId == req.preRenderedData.pageSettings.defaultLangId) {
            req.cookies.delete("languageId");
            req.preRenderedData.cookies.languageId = undefined;
            const language = req.preRenderedData.languages.findSingle("_id", req.preRenderedData.languageId);
            if (language) {
                NextResponse.redirect(req.preRenderedData.apiPath.website.full.replace(
                    `${req.preRenderedData.apiPath.website.base}/${language.shortKey}-${language.locale}`,
                    `${req.preRenderedData.apiPath.website.base}`
                ));
                return;
            }
        } else {
            if (
                (Variable.isEmpty(req.preRenderedData.cookies.languageId)) ||
                (req.preRenderedData.cookies.languageId != req.preRenderedData.languageId)
            ) {
                res.cookies.set("languageId", req.preRenderedData.languageId, {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true,
                    path: "/"
                })
            }

        }
    },
};
