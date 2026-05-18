import {Queue} from 'bullmq';

const newProductQueue = new Queue('newproduction', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});