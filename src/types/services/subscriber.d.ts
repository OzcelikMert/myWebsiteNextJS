import {SubscriberDocument} from "../models/subscriber";

export type SubscriberAddDocument = {} & Omit<SubscriberDocument, "_id">