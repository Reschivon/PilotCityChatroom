import bson from "bson";

import { Message } from "@/@types/message"


export interface Room {
    _id: bson.ObjectId,
    owner: string,
    members: Array<String>,
    name: string,
    messages: Array<Message>
}