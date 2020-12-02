import bson from "bson";


export interface UserData {
    _id: bson.ObjectId,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
}