import * as Realm from "realm-web";

import { UserData } from "@/@types";
import { app } from "@/services";

export async function loginUserEmailPassword(email: string, password: string) {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    console.log("loginUserEmailPassword: ", user);
    return user;
  } catch (e) {
    console.log("loginUserEmailPassword error: ", e);
  }
}

export async function registerUserEmailPassword(email: string, password: string, userData: UserData) {
  await app.emailPasswordAuth.registerUser(email, password);
  const credentials = Realm.Credentials.emailPassword(email, password);

  try {
    const user = await app.logIn(credentials);
    console.log("registerUserEmailPassword: ", user);
    await updateUserDocument(userData);
    return user;
  } catch (e) {
    console.log("registerUserEmailPassword error: ", e);
  }
}

export async function updateUserDocument(userData: UserData) {
  // see https://docs.mongodb.com/realm/web/mongodb/#instantiate-a-mongodb-collection-handle
  const mongo = app.currentUser?.mongoClient("mongodb-atlas");
  const mongoCollection = mongo?.db("chatrooms").collection("users");
  try {
    const result = await mongoCollection?.updateOne({userId: app.currentUser?.id}, { $set: userData });
    console.log("updateUserDocument: ", result);
    return result;
  } catch (e) {
    console.log("updateUserDocument error: ", e);
  }
}

export async function logOut() {
  try {
    await app.currentUser?.logOut();
  } catch (e) {
    console.log("logOut error: ", e);
  }
}
