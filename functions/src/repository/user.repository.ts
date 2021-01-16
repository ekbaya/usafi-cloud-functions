import * as admin from 'firebase-admin';
import { User } from '../domain/user';


const firestoreDatabase = admin.firestore();

/**
 * TODO Add Data Validation
 * @param user 
 */

export const createUser = async (user: User) => {
    if(!await getUserByEmail(user.email)) {
        user.id = firestoreDatabase.collection('users').doc().id;
        await firestoreDatabase.collection('users').doc(user.id).set(user);
        return user;
    }
    return null;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    console.log(email);
    
    const snapshot = await firestoreDatabase.collection('users')
    .where('email', '==', email)
    .get()
    if(!snapshot.empty) {
        return <User> snapshot.docs[0].data();
    }
    return null;
}