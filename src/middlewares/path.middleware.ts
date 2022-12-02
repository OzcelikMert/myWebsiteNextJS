import pathUtil from "shared/utils/path.util";
import {NextRequest} from "next/server";

export default {
    set(req: NextRequest){
        let paths = req.nextUrl;

        req.appData.apiPath = {
            website: {
                full: `${paths.protocol}//${paths.host}${paths.pathname !== "/" ? `${paths.pathname}` : ""}`.replace(/\/$/, ""),
                base: `${paths.protocol}//${paths.host}`,
                originalUrl: paths.pathname !== "/" ? `${paths.pathname}` : ""
            },
            ...pathUtil
        }
    },
}