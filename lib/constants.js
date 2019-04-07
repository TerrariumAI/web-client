let ServerAddress = "http://35.193.119.21:443";
if (process.env.NODE_ENV == "minikube") {
  ServerAddress = "http://192.168.99.100:443";
} else if (process.env.NODE_ENV == "development") {
  ServerAddress = "https://localhost:443";
}
export { ServerAddress };
