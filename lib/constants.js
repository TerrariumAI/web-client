let ServerAddress = "https://35.193.119.21:443";
if (process.env.NODE_ENV == "minikube") {
  ServerAddress = "https://192.168.99.100:443";
} else if (process.env.NODE_ENV == "development") {
  ServerAddress = "https://localhost:443";
}
export { ServerAddress };
