import {ObjectId, Timestamp} from "bson";


export interface Message {
    _id: ObjectId
    user: string,
    content: string,
    createdAt: Timestamp,
}