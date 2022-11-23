import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import PostDocument, {
    PostGetParamDocument, PostUpdateViewParamDocument,
} from "types/shared/services/post";

export default {
    get(params: PostGetParamDocument): Promise<ServiceResultDocument<PostDocument[]>> {
        let url = Array.isArray(params.typeId) ? [] : [params.typeId?.toString(), params.postId?.toString()]
        return Api.get({
            url: [ServicePages.post, ...url],
            data: params
        });
    },
    updateView(params: PostUpdateViewParamDocument) {
        return Api.put({
            url: [ServicePages.post, "view", params.typeId.toString(), params.postId.toString()],
            data: params
        });
    }
}