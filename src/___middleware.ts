import {NextResponse, type NextRequest, NextFetchEvent} from "next/server";
import preRenderedDataInitMiddleware from "./middlewares/init/preRenderedData.init.middleware";
import pathUtilInitMiddleware from "./middlewares/init/pathUtil.init.middleware";
import ipMiddleware from "./middlewares/validate/ip.middleware";
import cookieInitMiddleware from "./middlewares/init/cookie.init.middleware";
import languageInitMiddleware from "./middlewares/init/language.init.middleware";
import languageMiddleware from "./middlewares/validate/language.middleware";
import settingInitMiddleware from "./middlewares/init/setting.init.middleware";
import themeToolInitMiddleware from "./middlewares/init/themeTool.init.middleware";

export async function ___middleware(req: NextRequest) {
    let res = NextResponse.next();

    /*await pathUtilInitMiddleware.set(req);

    await ipMiddleware.checkCountry(req);
    await ipMiddleware.checkBlackList(req);

    await cookieInitMiddleware.set(req);
    await languageInitMiddleware.set(req);

    let langMatches = req.nextUrl.pathname.match(/\/([a-z]{2}\-[A-Z]{2})/gm);
    if(langMatches && langMatches.length > 0){
        let langKey = langMatches[0].slice(1);
        console.log(langKey);
        await languageMiddleware.check(req, langKey);
        await settingInitMiddleware.set(req);
        await languageMiddleware.setCookie(req, res);
    }else {
        await languageMiddleware.checkCookie(req);
        await settingInitMiddleware.set(req);
    }

    await themeToolInitMiddleware.set(req);
    await themeToolInitMiddleware.getNavigates(req);
    await themeToolInitMiddleware.getFooter(req);*/
    return res;
}

export const config = {
    matcher: [
        "/",
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next|favicon.ico).*)",
    ]
}