import {NextRequest} from "next/server";

export default {
    set: async (
        req: NextRequest
    ) => {
        req.preRenderedData.cookies = {
            ...req.preRenderedData.cookies,
        };
    },
};
