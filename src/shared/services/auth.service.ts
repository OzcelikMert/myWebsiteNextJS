import Api from "./api";
import {ServicePages} from "../constants";
import ServiceResultDocument from "types/shared/services/api/result";
import {AuthLoginParamDocument, AuthGetSessionParamDocument} from "types/shared/services/auth";
import UserDocument from "types/shared/services/user";

export default {
    getSession(params: AuthGetSessionParamDocument): Promise<ServiceResultDocument<UserDocument[]>> {
        return Api.get({
            url: [ServicePages.auth],
            data: params,
        });
    },
    login(params: AuthLoginParamDocument): Promise<ServiceResultDocument<UserDocument[]>> {
        return Api.post({
            url: [ServicePages.auth],
            data: params,
        });
    },
    logOut() {
        return Api.delete({
            url: [ServicePages.auth],
        });
    },
}