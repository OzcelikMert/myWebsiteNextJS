import {NextRequest} from "next/server";

export default {
    set: async (
        req: NextRequest
    ) => {
        req.preRenderedData = {
            ...req.preRenderedData
        };
    },
};
