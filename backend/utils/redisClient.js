// import { createClient } from 'redis';

// const redisHost = process.env.REDIS_HOST || 'localhost';
// const redisPort = process.env.REDIS_PORT || 6379;

// const redisClient = createClient({
//   socket: {
//     host: redisHost,
//     port: redisPort,
//   },
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// await redisClient.connect();

// export default redisClient;


import { createClient } from 'redis';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT) || 6379; // ✅ ensure it's a number

const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Use an async IIFE to handle the connect call
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (err) {
    console.error('Failed to connect to Redis', err);
  }
})();

export default redisClient;
