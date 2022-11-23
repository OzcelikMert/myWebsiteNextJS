import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import {ComponentDocument, ComponentGetParamDocument} from "types/shared/services/component";

export default {
    get(params: ComponentGetParamDocument): Promise<ServiceResultDocument<ComponentDocument[]>> {
        return Api.get({
            url: [ServicePages.component, params._id?.toString()],
            data: params,
        });
    },
}