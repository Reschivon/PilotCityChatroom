import { ObjectId } from "bson";

import { Message, Room } from "@/@types";
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
      messages: []
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
  let findOptions = {
    projection: {
      messages: 0
    }
  };
  try {
    const result = await mongoCollection?.find({}, findOptions);
    console.log("findRooms: ", result);
    return result as Array<Room>;
  } catch (e) {
    console.log("findRooms error:", e);
  }
}

export async function findMessages(roomId: string | ObjectId): Promise<Array<Message> | undefined> {
  const mongo = services.app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("rooms");
  let findOptions = {
    projection: {
      _id: 1,
      messages: 1
    }
  };
  try {
    const result = await mongoCollection?.findOne({_id: new ObjectId(roomId)}, findOptions)
    console.log("findMessages: ", result);
    return (result as Room).messages as Array<Message>;
  } catch (e) {
    console.log("findMessages error:", e);
  }
}
