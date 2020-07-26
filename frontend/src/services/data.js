import * as services from "./index";

var data = {
  rooms: [],
};

export {data};
export async function fetchRooms() {
  data.rooms = (await services.roomService.find({})).data;
  return data.rooms;
}


services.roomService.on("all", (event) => {
  console.log(event);
})

/*
services.client.get("authentication").then(auth => {
    console.log("user", auth.user);
  });
*/
