import {StatusId} from "shared/constants";

export default interface UserDocument {
    _id: string
    roleId: number,
    statusId: StatusId,
    image: string,
    name: string,
    comment: string,
    phone: string,
    email: string,
    password: string,
    permissions: number[],
    banDateEnd: Date,
    banComment: string,
    facebook: string,
    instagram: string,
    twitter: string,
    views: number,
}

export interface PopulateAuthorIdDocument {
    _id: string,
    name: string,
    email: string,
    url: string
}