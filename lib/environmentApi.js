import axios from "axios";

const baseURL =
  "http://35.244.188.173/endpoints.terrariumai.environment.Environment";

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

export async function CreateEntity(idToken, modelID, x, y) {
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
