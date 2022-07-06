import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Firestore } from 'firebase/firestore/lite';
import { uploadBytes, ref, getStorage, FirebaseStorage, getDownloadURL } from 'firebase/storage';

export class FirebaseService {
    db: Firestore = <any>null;
    storage: FirebaseStorage = <any>null;

    constructor() {
        initializeApp({
            projectId: 'batizado-casamento',
            databaseURL: "https://batizado-casamento.firebaseio.com",
            storageBucket: "gs://batizado-casamento.appspot.com"
        });
        this.db = getFirestore();
        this.storage = getStorage();
    }

    setDedicatoria(value: any) {
        value.date = new Date();
        const messagesCol = collection(this.db, "messages");
        if (value.image != null) {
            const st = ref(this.storage, `/selfies_${value.name}_${new Date().toISOString()}`);
            return uploadBytes(st, value.image, { customMetadata: { type: 'selfie' } }).then(n => {
                value.image = n.ref.fullPath;
                return addDoc(messagesCol, value);
            });
        }

        return addDoc(messagesCol, value);
    }

    getDedicatorias() {
        const messagesCol = collection(this.db, "messages");
        return new Promise((resolve, reject) => {
            getDocs(messagesCol).then(querySnapshot => {
                let list = <any>[];
                querySnapshot.forEach(n => {
                    list.push(<any>n.data());
                });

                let promises = <any>[];
                for (let item of list) {
                    if(item.date) {
                        item.date = item.date.toDate();
                    }
                    
                    if (item.image != null) {
                        promises.push(
                            getDownloadURL(
                                ref(this.storage, item.image)
                            ).then(url => {
                                item.image = url;
                            })
                        );
                    }
                }

                Promise.all(promises).then(() => {
                    resolve(list);
                });
            }).catch(r => reject(r));
        })

    }
}