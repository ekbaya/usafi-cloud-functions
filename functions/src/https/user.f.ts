import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createUserImplementation} from '../services/user.service';

const express = require('express');
const app = express();
const cors = require('cors');

try {admin.initializeApp(functions.config().firebase);} catch{}
app.use(cors({origin: true}));

app.post('/create', async (req: functions.Request, res: functions.Response) => {
    await createUserImplementation(req, res);
});


exports = module.exports =  functions.https.onRequest(app);