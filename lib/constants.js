let ServerAddress = "http://35.193.119.21:9091";
if (process.env.NODE_ENV == "minikube") {
  ServerAddress = "http://192.168.99.100:31036";
} else if (process.env.NODE_ENV == "development") {
  ServerAddress = "http://localhost:9091";
}
export { ServerAddress };
