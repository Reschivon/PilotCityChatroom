import Vue from "vue";
import Vuex from "vuex";
import { ObjectId } from "bson";
import * as services from "@/services/";
import { Message, Room, UserData } from "@/@types";
import { connect } from 'socket.io-client';

Vue.use(Vuex);

export interface State {
  currentRoom?: Room;
  rooms: Array<Room>;
  users: Array<UserData>;
  messages: Array<Message>;
}

export const store = new Vuex.Store<State>({
  state: {
    currentRoom: undefined,
    rooms: [],
    users: [],
    messages: []
  },
  getters: {},
  mutations: {
    setCurrentRoom: (state, payload: Room) => {
      state.currentRoom = payload;
    },
    updateRoom: (state, payload: Room) => {
      let roomIndex = state.rooms.findIndex(room => room._id.equals(payload._id));
      if (roomIndex != -1) {
        Vue.set(state.rooms, roomIndex, payload);
        if (state.currentRoom?._id.equals(payload._id)) state.currentRoom = payload;
      }
      else {state.rooms.push(payload)};
    },
    fetchRooms: (state, payload: Array<Room>) => {
      state.rooms = payload;
    },
    fetchUsers: (state, payload) => {
      state.users = payload;
    },
    fetchMessages: (state, payload) => {
      state.messages = payload;
    },
    fetchRoomMessages: (state, payload: { roomId: ObjectId | string, messages: Array<Message> }) => {
      let room = state.rooms.find(room => room._id == new ObjectId(payload.roomId));
      if (room) room.messages = payload.messages;
    },
    pushMessage: (state, payload) => {
      state.messages.push(payload as never);
    }
  },
  actions: {
    setCurrentRoom: async (context, payload: ObjectId | string) => {
      let room = context.state.rooms.find(room => room._id == new ObjectId(payload)) || undefined;
      if (room?.messages == undefined) await context.dispatch("fetchRoomMessages", payload);
      context.commit("setCurrentRoom", room);
    },
    fetchRooms: async context => {
      try {
        let rooms: Array<Room> | undefined = await services.Rooms.findRooms();
        context.commit("fetchRooms", rooms);
        services.Rooms.watchRooms(change => {
          store.commit("updateRoom", change.fullDocument as Room);
        });
      } catch (e) {
        console.log("fetchRooms exception: ", e);
      }
    },
    fetchUsers: async context => {
      try {
        let users = (await services.userService.find({})).data;
        context.commit("fetchUsers", users);
      } catch (e) {
        console.log("fetchUsers exception: ", e);
      }
    },
    fetchMessages: async context => {
      try {
        let users = (await services.messageService.find({})).data;
        context.commit("fetchMessages", users);
      } catch (e) {
        console.log("fetchMessages exception: ", e);
      }
    },
    fetchRoomMessages: async (context, payload: ObjectId | string ) => {
      try {
        let messages = await services.Rooms.findMessages(payload);
        context.commit("fetchRoomMessages", { roomId: payload, messages: messages })
      } catch (e) {
        console.log("fetchRoomMessages exception: ", e);
      }
    },
    pushMessage: (context, payload) => {
      context.commit("pushMessage", payload);
    }
  }
});
/* eslint-enable no-unused-vars */
