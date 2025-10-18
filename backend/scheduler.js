// scheduler.js
import cron from 'node-cron';
import { fetchAndStoreArticles } from './Jobs/fetchArticles.js';

const defaultKeywords = ['crypto', 'Gold' ,'Silver' ,'banking', 'ai', 'stock', 'finance' , 'Retirement Planing' ,"Stocks" , "Mutual Funds" , "Savings" , 'Sensex']  ;

export const startScheduler = () => {
  cron.schedule('0 0 * * *', async () => { // every 24 hours at midnight
    console.log('⏰ Daily scheduled fetch started');
    await fetchAndStoreArticles(defaultKeywords);
  });
};
