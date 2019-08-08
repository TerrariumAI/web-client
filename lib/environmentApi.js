import axios from "axios";

const baseURL =
  "https://environment.terrarium.ai/endpoints.terrariumai.environment.Environment";

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