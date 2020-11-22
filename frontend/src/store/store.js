import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-disable no-unused-vars */
import * as services from '../services/index.ts';

Vue.use(Vuex);

export const store = new Vuex.Store({
  
  state: {
    currentUser: {},
    currentRoom: {},
    rooms: [],
    users: [],
    messages: [],
  },
  getters: {

  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.currentUser = payload;
    },
    setCurrentRoom: (state, payload) => {
      state.currentRoom = payload;
    },
    fetchRooms: (state, payload) => {
      state.rooms = payload;
    },
    fetchUsers: (state, payload) => {
      state.users = payload;
    },
    fetchMessages: (state, payload) => {
      state.messages = payload;
    },
    pushMessage: (state, payload) => {
      state.messages.push(payload);
    },
  },
  actions: {
    setCurrentUser: (context, payload) => {
      context.commit('setCurrentUser', payload);
    },
    setCurrentRoom: (context, payload) => {
      context.commit('setCurrentRoom', payload);
    },
    fetchRooms: async context => {
      try {
        let rooms = (await services.roomService.find({})).data;
        context.commit('fetchRooms', rooms);
      } catch (e) {
        console.log("fetchRooms exception: ", e);
      }
    },
    fetchUsers: async context => {
      try {
        let users = (await services.userService.find({})).data;
        context.commit('fetchUsers', users);
      } catch (e) {
        console.log("fetchUsers exception: ", e);
      }
    },
    fetchMessages: async context => {
      try {
        let users = (await services.messageService.find({})).data;
        context.commit('fetchMessages', users);
      } catch (e) {
        console.log("fetchMessages exception: ", e);
      }
    },
    pushMessage: (context, payload) => {
      context.commit('pushMessage', payload)
    },
  }
})
/* eslint-enable no-unused-vars */