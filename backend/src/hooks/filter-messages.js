// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const logger = require("../logger");
const { ObjectId } = require("mongodb");
const { Forbidden } = require("@feathersjs/errors");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    //logger.info("filterMessages-context", context);
    const { app, params } = context;
    // let roomsOfUser;
    // app.service("rooms").find(params).then(response => {
    //   roomsOfUser = response.data;
    //   logger.info("roomsOfUser", roomsOfUser); 
    // }).catch(e => {
    //   logger.info("roomsOfUser exception", e); 
    // });
    
    async () => {let roomsOfUser = await app.service("rooms").find(params);
    logger.info("roomsOfUser", roomsOfUser); }
    /*
    // get intersection of array of rooms that the user is searching for and array of rooms that user has access to
    if (typeof(params.query.room) == Array) { 
      logger.info("tis an array");
      let queriedRooms = roomsOfUser.filter(room => context.params.query.room.contains(room)).map(room => ObjectId(room));
      context.params.query.room = {$in : queriedRooms}
    } else if (params.query.room) {
      logger.info("tis a single object");
      let queriedRoom = ObjectId(context.params.query.room);
      if (roomsOfUser.contains(queriedRoom)) context.params.query.room = queriedRoom;
      else new Forbidden("not authorized to access messages for this chatroom");
    }
      
      logger.info()
      context.params.query.room = roomsOfUser;

    //const specifyRoom;
    */

    return context;
  };
};
