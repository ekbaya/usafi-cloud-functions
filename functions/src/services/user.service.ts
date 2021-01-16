import { createUser, getUserByEmail} from "../repository/user.repository"
import { Request, Response } from 'firebase-functions';
import { User } from "../domain/user";

export const createUserImplementation = async (req: Request, res: Response) => {
    const body: User = <User> req.body;
    const user = await createUser(body);
    if(user) {
        res.send(user);
        return;
    }
    res.status(403).send({})
}

export const getUserByEmailAddressImplementation = async (req:Request, res: Response) => {
    try {
        const email = req.query.email?.toString() || '';        
        const user = await getUserByEmail(email);
        if(user) {
            res.send(user);
            return;
        }
        res.status(403).send({});
    } catch(ex) {
        console.log(ex);
    }
}