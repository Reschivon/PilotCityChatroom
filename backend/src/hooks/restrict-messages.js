// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { ObjectId } = require("mongodb");
const { Forbidden } = require("@feathersjs/errors");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    
    //logger.info("filterMessages-context", context);
    const { app, method, type, params } = context;
    if (type == "before") {
      if (method == "find") {
        let roomsOfUser = (await app.service("rooms").find(params)).data.map(room => room._id);

        // get intersection of array of rooms that the user is searching for and array of rooms that user has access to
        if (typeof(params.query.room) == Array) { 
          let queriedRooms = roomsOfUser.filter(room => context.params.query.room.contains(room)).map(room => ObjectId(room));
          context.params.query.room = {$in : queriedRooms};
        } 
        // if user queries single room
        else if (params.query.room) {
          let queriedRoom = ObjectId(context.params.query.room);
          if (roomsOfUser.contains(queriedRoom)) context.params.query.room = queriedRoom;
          else new Forbidden("not authorized to access messages for this chatroom");
        } 
        // if room is not specified
        else {
          context.params.query.room = {$in : roomsOfUser};
        }
        // for some reason the context changes after finding rooms so I just set the users to null so that it doesnt break everything
        context.params.query.users = null;
      }
    }
    
    return context;
  };
};
