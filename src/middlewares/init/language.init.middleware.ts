import languageService from "shared/services/language.service";
import {NextRequest} from "next/server";

export default {
    set: async (
        req: NextRequest
    ) => {
        req.preRenderedData.languages = (await languageService.get({})).data;
    },
};
