import {PreRenderedDataDocument} from "../shared/utils/preRenderedData";

declare global {
    namespace Express {
        interface Request {
            preRenderedData : PreRenderedDataDocument
        }
    }
}