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

/**
 * Gets All Users In The Database
 */
export const getUsers = async () :Promise<User[]> => {
    const users:User[] = [];
    const snapshot = await firestoreDatabase.collection('users').get();
    snapshot.forEach(userSnapshot => {
        users.push(<User> userSnapshot.data());
    });
    return users;
}

export const updateUser = async (user: User) => {
    if(user.id) {
        await firestoreDatabase.collection('users').doc(user.id).update(user);
    }
}