import {IncomingMessage} from "http";
import postService from "services/post.service";
import viewService from "services/view.service";

export default {
    async set(req: IncomingMessage) {
        if(req.pageData.page) {
            await postService.updateView({
                postId: req.pageData.page._id,
                typeId: req.pageData.page.typeId,
                langId: req.appData.languageId,
                url: req.appData.apiPath.website.originalUrl
            });

            await viewService.add({
                url: req.appData.apiPath.website.originalUrl,
                lang: req.appData.languageId
            });
        }
    }
}