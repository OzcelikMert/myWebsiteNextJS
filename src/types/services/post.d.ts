import {PopulateTermsDocument} from "./postTerm";
import {PopulateAuthorIdDocument} from "./user";
import {PageTypeId, PostTypeId, StatusId} from "constants/index";
import {ComponentDocument} from "types/services/component";

export interface PostContentButtonDocument {
    _id?: string
    title: string,
    url: string
}

export interface PostContentDocument {
    langId: string
    image?: string,
    title: string,
    content?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string
    buttons?: PostContentButtonDocument[]
}

export default interface PostDocument {
    _id: string
    typeId: PostTypeId,
    pageTypeId?: PageTypeId,
    mainId?: {
        _id: string
        contents: {
            langId: string
            title: string,
            url: string,
        }
    },
    statusId: StatusId,
    authorId: PopulateAuthorIdDocument
    lastAuthorId: PopulateAuthorIdDocument
    dateStart: Date,
    order: number,
    views: number,
    isFixed?: boolean,
    terms: (PopulateTermsDocument | undefined)[]
    contents?: PostContentDocument,
    components?: ComponentDocument[],
    alternates?: PostAlternateDocument[]
}

export interface PostAlternateDocument {
    langId: string
    title?: string,
    url?: string
}

export interface PostGetParamDocument {
    langId?: string
    url?: string,
    pageTypeId?: PageTypeId
    postId?: string
    typeId?: PostTypeId | PostTypeId[]
    statusId?: StatusId
    getContents?: 1 | 0
    maxCount?: number
}

export type PostUpdateViewParamDocument = {
    postId: string,
    typeId: number
    langId: string
    url: string
}