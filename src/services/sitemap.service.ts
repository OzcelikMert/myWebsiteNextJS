import Api from "./api";
import {ServicePages} from "constants/index";
import ServiceResultDocument from "types/services/api/result";
import {SitemapDocument, SitemapGetParamDocument, SitemapIndexDocument} from "types/services/sitemap";

export default {
    get(params: SitemapGetParamDocument): Promise<ServiceResultDocument<SitemapDocument | SitemapIndexDocument>> {
        let name = Array.isArray(params.name) ? [] : [params.name]
        return Api.get({
            url: [ServicePages.sitemap, ...name],
            data: params
        });
    }
}