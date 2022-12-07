import {IncomingMessage} from "http";
import postService from "services/post.service";
import {PostTypeId, StatusId} from "constants/index";
import componentService from "services/component.service";

export default {
    async setTools(req: IncomingMessage) {
        req.pageData.themeTools = {
            ...req.pageData.themeTools
        }

        req.pageData.themeTools.navigations = (await postService.get({
            statusId: StatusId.Active,
            langId: req.appData.languageId,
            typeId: PostTypeId.Navigate
        })).data

        const footer = (await componentService.get({
            langId: req.appData.languageId,
            elementId: "footer",
            getContents: 1
        })).data

        req.pageData.themeTools.footer = (footer.length > 0) ? footer[0] : undefined;
    },
    async setComponents(req: IncomingMessage) {
        if(req.pageData.page){
            let components = req.pageData.page.components;
            if(components){
                for (const component of components) {
                    switch (component.elementId) {
                        case "services":
                            req.pageData.services = (await postService.get({
                                langId: req.appData.languageId,
                                typeId: PostTypeId.Service,
                                statusId: StatusId.Active
                            })).data;
                            break;
                        case "testimonials":
                            req.pageData.testimonials = (await postService.get({
                                langId: req.appData.languageId,
                                typeId: PostTypeId.Testimonial,
                                getContents: 1,
                                statusId: StatusId.Active
                            })).data;
                            break;
                        case "clients":
                            req.pageData.clients = (await postService.get({
                                langId: req.appData.languageId,
                                typeId: PostTypeId.Reference,
                                statusId: StatusId.Active
                            })).data;
                            break;

                    }
                }
            }
        }
    }
};