## Terrarium AI Web Client

This is the webclient for OlamAI. From here user's can observe Olam's persistant world and watch the AI interracting with it.

## Dev vs Prod

`npm run dev`  
This will start in dev mode, meaning it will connect to a private development Firebase server and a locally hosted (minikube) Envoy-Proxy service. The cridentials for the dev Firebase environment are in the .env file.

`npm run start`  
This starts it in production which will connect to the production Envoy-Proxy service and will connect to the production Firebase environment.
