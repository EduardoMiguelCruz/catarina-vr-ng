import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Firestore } from 'firebase/firestore/lite';

export class FirebaseService {
    db: Firestore = <any>null;

    constructor() {
        initializeApp({
            projectId: 'batizado-casamento',
            databaseURL: "https://batizado-casamento.firebaseio.com"
        });
        this.db = getFirestore();
    }

    setDedicatoria(value: any) {
        const messagesCol = collection(this.db, "messages")
        return addDoc(messagesCol, value);
    }

    getDedicatorias() {
        const messagesCol = collection(this.db, "messages")
        return getDocs(messagesCol);
    }
}