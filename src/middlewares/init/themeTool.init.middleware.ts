import {PostTypeId, StatusId} from "shared/constants";
import postService from "shared/services/post.service";
import componentService from "shared/services/component.service";
import {NextRequest} from "next/server";

export default {
    set: async (
        req: NextRequest
    ) => {
        req.preRenderedData.themeTools = {
            ...req.preRenderedData.themeTools,
        };
    },
    getNavigates: async (
        req: NextRequest
    ) => {
        req.preRenderedData.themeTools = {
            ...req.preRenderedData.themeTools
        };
        req.preRenderedData.themeTools.navigations = ( await postService.get({
            statusId: StatusId.Active,
            langId: req.preRenderedData.languageId,
            typeId: PostTypeId.Navigate
        })).data
    },
    getFooter: async (
        req: NextRequest
    ) => {
        const footer = (await componentService.get({
            langId: req.preRenderedData.languageId,
            elementId: "footer",
            getContents: 1
        })).data
        req.preRenderedData.themeTools.footer = (footer.length > 0) ? footer[0] : undefined;
    },
};
