let ServerAddress = "https://simulation.terrarium.ai:9091";
if (process.env.NODE_ENV == "minikube") {
  ServerAddress = "https://192.168.99.100:9091";
} else if (process.env.NODE_ENV == "development") {
  ServerAddress = "https://localhost:9091";
}
export { ServerAddress };
