import {PopulateAuthorIdDocument} from "./user";
import LanguageKeys from "../app/languages";

export interface ComponentGetParamDocument {
    _id?: string
    langId?: string,
    elementId?: string
    getContents?: 1,
}

export interface ComponentTypeContentDocument {
    langId: string
    content?: string
    url?: string
    comment?: string
}

export interface ComponentTypeDocument {
    _id: string,
    elementId: string
    typeId: number,
    langKey: string,
    order: number,
    contents?: ComponentTypeContentDocument
}

export interface ComponentDocument {
    _id: string,
    authorId: PopulateAuthorIdDocument
    lastAuthorId: PopulateAuthorIdDocument
    elementId: string
    langKey: string,
    order: number,
    types: ComponentTypeDocument[]
}