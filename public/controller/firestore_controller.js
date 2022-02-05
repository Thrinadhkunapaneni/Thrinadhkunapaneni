import {
    getFirestore, collection, addDoc, getDocs, query,orderBy,
    doc, getDoc, 
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js'
import { COLLECTIONS } from "../model/constants.js";
import { Thread } from '../model/thread.js';
import {Edit} from '../viewpage/edit.js';

const db = getFirestore();

export async function addThread(thread) {
    const docRef = await addDoc(collection(db, COLLECTIONS.THREADS), thread.toFirestore());
    return docRef.id;

}

export async function getThreadList(){
    let threadList = [];
    const q = query(collection(db, COLLECTIONS.THREADS),orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const t=new Thread(doc.data());
        t.set_docId(doc.id);
        threadList.push(t);
    });
    return threadList;
}

export async function getOneThread(threadId){
    const docRef = doc(db,COLLECTIONS.THREADS, threadId);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) return null;
    const t = new Thread(docSnap.data());
    t.set_docId(threadId);
    return t;
}

export async function addReply(reply){
    const docRef = await addDoc(collection(db, COLLECTIONS.REPLIES), reply.toFirestore());
    return docRef.id;
}


