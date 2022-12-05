import {NextResponse, type NextRequest, NextFetchEvent} from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    let res = NextResponse.next();
   // req.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

    let langMatches = req.nextUrl.pathname.match(/\/([a-z]{2}\-[a-z]{2})/gm);
    if(langMatches && langMatches.length > 0) {
        let langKey = langMatches[0];
        req.nextUrl.pathname = req.nextUrl.pathname.replace(langKey, "")
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