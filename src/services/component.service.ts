import Api from "./api";
import {ServicePages} from "constants/index";
import ServiceResultDocument from "types/services/api/result";
import {ComponentDocument, ComponentGetParamDocument} from "types/services/component";

export default {
    get(params: ComponentGetParamDocument): Promise<ServiceResultDocument<ComponentDocument[]>> {
        return Api.get({
            url: [ServicePages.component, params._id?.toString()],
            data: params,
        });
    },
}