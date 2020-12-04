import { Room } from '@/@types/room';
import * as services from "@/services";

export async function createRoom(roomName: String) {
    // does not work yet, will probably do this with a cloud function
    const mongo = services.app.currentUser?.mongoClient("mongodb-atlas");
    const mongoCollection = mongo?.db("chatrooms").collection("rooms");
    try {
        const result = await mongoCollection?.insertOne({
            owner: services.app.currentUser?.id,
            members: [services.app.currentUser?.id],
            name: roomName,
            messages: [],
        });
        console.log("createRoom: ", result);
        return result;
    } catch (e) {
        console.log("createRoom error: ", e);
    }
    
}

export async function findRooms(): Promise<Array<Room> | undefined> {
    const mongo = services.app.currentUser?.mongoClient("mongodb-atlas");
    const mongoCollection = mongo?.db("chatrooms").collection("rooms");
    try {
        const result = await mongoCollection?.find({});
        console.log("findRooms: ", result);
        return result as Array<Room>;
    } catch (e) {
        console.log("findRooms error:", e);
    }
}