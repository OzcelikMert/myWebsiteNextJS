import {NextRequest, NextResponse} from "next/server";

export default {
    set(req: NextRequest) {
        req.appData.cookies = {
            languageId: req.cookies.get("languageId")?.value ?? ""
        };
    },
    setLanguageId(req: NextRequest, res: NextResponse) {
        res.cookies.set("languageId", req.appData.languageId, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            path: "/"
        });
    },
    deleteLanguageId(res: NextResponse) {
        res.cookies.set("languageId", "", {maxAge: 0, httpOnly: true, path: "/"});
    }
};