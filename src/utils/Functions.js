
import { collection, addDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../utils/firebase-config';


export const doLike = async (email_id, genres, content_id, image_path, content_name) => {
    try {
        await addDoc(collection(db, "LikedMovies"), {
            email: email_id,
            genres: genres,
            id: content_id,
            image: image_path,
            name: content_name
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const doDisLike = async (email_id, genres, content_id, image_path, content_name) => {
    try {
        await addDoc(collection(db, "DisLikedMovies"), {
            email: email_id,
            genres: genres,
            id: content_id,
            image: image_path,
            name: content_name
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const addToList = async (email_id, genres, content_id, image_path, content_name) => {
    try {
        // Create a query to check if a document with the same email and id already exists
        const q = query(
            collection(db, 'AddToList'),
            where('email', '==', email_id),
            where('id', '==', content_id)
        );

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if any documents were returned by the query
        if (querySnapshot.empty) {
            // No documents were found, so we can add a new document
            await addDoc(collection(db, 'AddToList'), {
                email: email_id,
                genres: genres,
                id: content_id,
                image: image_path,
                name: content_name
            });
        } else {
            console.log('A document with the same email and id already exists');
        }
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}


export const removeFromList = async (content_id, email_id) => {
    try {
        const q = query(
            collection(db, "AddToList"),
            where("email", "==", email_id),
            where("id", "==", content_id)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export const getLikedContentData = async (email) => {
    const q = query(collection(db, "AddToList"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const movies = querySnapshot.docs.map((doc) => doc.data());
    return movies;
}