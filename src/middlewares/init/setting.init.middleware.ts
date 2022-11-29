import settingService from "shared/services/setting.service";
import Variable from "shared/library/variable";
import {NextRequest} from "next/server";

export default {
    set: async (
        req: NextRequest
    ) => {
        req.preRenderedData.pageSettings = (await settingService.get({
            ...(req.preRenderedData.languageId ? {langId: req.preRenderedData.languageId} : {})
        })).data[0];
        if(Variable.isEmpty(req.preRenderedData.languageId)){
            req.preRenderedData.languageId = req.preRenderedData.pageSettings.defaultLangId;
        }
    },
};
