import bson from "bson";


export interface Message {
    user: string,
    content: string,
    createdAt: bson.Timestamp,
}