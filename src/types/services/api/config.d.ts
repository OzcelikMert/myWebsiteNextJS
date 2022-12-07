import {ApiRequestParamMethodDocument} from "./index";
import {Result} from "utils/ajax";

interface ApiRequestConfigDocument {
    beforeSend?: beforeSend
    complete?: complete,
    onUploadProgress?: onProgress,
}

type onProgress = (xhr: XMLHttpRequest, event: ProgressEvent<EventTarget>, percentComplete: number) => void;
type beforeSend = (url: string, method: ApiRequestParamMethodDocument) => void;
type complete = (url: string, method: ApiRequestParamMethodDocument, result: Result, isRequestFailed: boolean) => void;

export {
    ApiRequestConfigDocument
}