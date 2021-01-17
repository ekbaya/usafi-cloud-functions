import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUserImplementation, getUsersImplementation, getUserByEmailAddressImplementation,
updateUserImplementation} from '../services/user.service';

const express = require('express');
const app = express();
const cors = require('cors');

try {admin.initializeApp(functions.config().firebase);} catch{}
app.use(cors({origin: true}));

app.post('/create', async (req: functions.Request, res: functions.Response) => {
    await createUserImplementation(req, res);
});

app.get('/', async (req: functions.Request, res:functions.Response) =>  {
    await getUsersImplementation(req, res)
});

app.get('/get', async (req: functions.Request, res: functions.Response) => {
    await getUserByEmailAddressImplementation(req,res);
});

app.post('/update', async(req: functions.Request, res: functions.Response) => {
    await updateUserImplementation(req, res);
})


exports = module.exports =  functions.https.onRequest(app);