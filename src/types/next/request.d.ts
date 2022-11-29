import {PreRenderedDataDocument} from "../shared/utils/preRenderedData";

declare global {
  interface Request {
      preRenderedData : PreRenderedDataDocument
  }
}