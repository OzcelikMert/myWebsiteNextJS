import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import {SitemapDocument, SitemapGetParamDocument, SitemapIndexDocument} from "types/shared/services/sitemap";

export default {
    get(params: SitemapGetParamDocument): Promise<ServiceResultDocument<SitemapDocument | SitemapIndexDocument>> {
        let name = Array.isArray(params.name) ? [] : [params.name]
        return Api.get({
            url: [ServicePages.sitemap, ...name],
            data: params
        });
    }
}