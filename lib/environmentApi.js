import axios from "axios";

const baseURL =
  "http://34.68.222.115/endpoints.terrariumai.environment.Environment";

export function GetEntitiesInRegion(idToken, x, y, onSuccess, onError) {
  const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: `Bearer ${idToken}` }
  });

  instance
    .post("/GetEntitiesInRegion", {
      x,
      y
    })
    .then(onSuccess)
    .catch(onError)
    .finally(function() {
      // always executed
    });
}
