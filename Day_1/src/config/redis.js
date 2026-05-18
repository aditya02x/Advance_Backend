import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://host.docker.internal:6379",
});

export default redisClient;