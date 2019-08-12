import axios from "axios";
const dev = process.env.NODE_ENV !== "production";

let baseURL =
  "https://environment.terrarium.ai/endpoints.terrariumai.environment.Environment";
if (dev) {
  baseURL="http://192.168.99.100:32080/endpoints.terrariumai.environment.Environment"
}

export var CLASS_IDS = {
  EMPTY: 0,
  AGENT: 1,
  ROCK: 2,
  FOOD: 3
}

export async function GetEntitiesInRegion(idToken, x, y) {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: `Bearer ${idToken}` }
  });

  return instance
    .post("/GetEntitiesInRegion", {
      x,
      y
    })
}

export function CreateEntity(idToken, modelID, x, y) {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: `Bearer ${idToken}` }
  });

  return instance
    .post("/CreateEntity", {
      entity: {
        modelID,
        x,
        y
      }
    })
}

export function DeleteEntity(idToken, entityId) {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: `Bearer ${idToken}` }
  });

  return instance
    .post("/DeleteEntity", {
      id: entityId
    })
}

export async function SpawnFood(idToken) {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: `Bearer ${idToken}` }
  });

  return instance
    .post("/SpawnFood", {})
}