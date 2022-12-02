import {IncomingMessage} from "http";

export default {
    set(req: IncomingMessage) {
        req.appData.cookies = {
            ...req.appData.cookies,
            ...req.cookies
        };
    },
};