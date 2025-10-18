import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis successfully');
  } catch (err) {
    console.error('❌ Failed to connect to Redis', err);
  }
})();

export default redisClient;
