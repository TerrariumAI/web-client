let ServerAddress = "http://35.193.119.21:9091";
if (process.env.NODE_ENV == "development") {
  ServerAddress = "http://192.168.99.100:31036";
}
export { ServerAddress };
