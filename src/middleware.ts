import {NextResponse, type NextRequest, NextFetchEvent} from "next/server";
import pathMiddleware from "./middlewares/path.middleware";
import languageMiddleware from "./middlewares/language.middleware";
import settingMiddleware from "./middlewares/setting.middleware";
import cookieMiddleware from "./middlewares/cookie.middleware";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    let res = NextResponse.next();
    req.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    console.log("middleware")

    req.appData = {
        ...req.appData
    };

    cookieMiddleware.set(req);
    pathMiddleware.set(req);
    await languageMiddleware.set(req);
    await settingMiddleware.set(req);

    let langMatches = req.appData.apiPath.website.originalUrl.match(/\/([a-z]{2}\-[a-z]{2})/gm);
    if(langMatches && langMatches.length > 0) {
        let langKey = langMatches[0].slice(1);
        if(!languageMiddleware.check(req, langKey)) return NextResponse.redirect(req.nextUrl, {headers: res.headers});
        if(languageMiddleware.checkDefaultLanguage(req)) {
            cookieMiddleware.deleteLanguageId(res);
            return NextResponse.redirect(req.nextUrl, {headers: res.headers})
        }
    }else {
        if(!languageMiddleware.checkCookieAndRedirect(req)) return NextResponse.redirect(req.nextUrl, {headers: res.headers});
    }

    cookieMiddleware.setLanguageId(req, res);

    if(req.appData.languageKeyWithLocale){
        req.nextUrl.pathname = req.nextUrl.pathname.replace(`/${req.appData.languageKeyWithLocale}`, "")
    }

    return NextResponse.rewrite(req.nextUrl, {headers: res.headers, request: req});
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