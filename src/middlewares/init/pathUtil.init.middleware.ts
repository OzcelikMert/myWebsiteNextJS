import pathUtil from "shared/utils/path.util";
import {NextRequest} from "next/server";

export default {
    set: async (
        req: NextRequest
    ) => {
        req.preRenderedData.apiPath = {
            website: {
                full: `${req.nextUrl.protocol}://${req.nextUrl.host}${req.nextUrl.origin !== "/" ? `${req.nextUrl.origin}` : ""}`.replace(/\/$/, ""),
                base: `${req.nextUrl.protocol}://${req.nextUrl.host}`,
                originalUrl: req.nextUrl.origin !== "/" ? `${req.nextUrl.origin}` : ""
            },
            ...pathUtil
        }
    },
};
