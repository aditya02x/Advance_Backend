import {Queue} from 'bullmq';

const productQueue = new Queue('newproduction', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});