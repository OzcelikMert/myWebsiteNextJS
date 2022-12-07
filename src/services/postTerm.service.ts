import Api from "./api";
import {ServicePages} from "constants/index";
import ServiceResultDocument from "types/services/api/result";
import PostTermDocument, {
    PostTermGetParamDocument, PostTermUpdateViewParamDocument,
} from "types/services/postTerm";

export default {
    get(params: PostTermGetParamDocument): Promise<ServiceResultDocument<PostTermDocument[]>> {
        let typeId = Array.isArray(params.typeId) ? [] : [params.typeId?.toString()]
        return Api.get({
            url: [ServicePages.postTerm, params.postTypeId.toString(), ...typeId, params.termId?.toString()],
            data: params
        });
    },
    updateView(params: PostTermUpdateViewParamDocument) {
        return Api.put({
            url: [ServicePages.postTerm, "view", params.postTypeId.toString(), params.typeId.toString(), params.termId.toString()],
            data: params
        });
    }
}