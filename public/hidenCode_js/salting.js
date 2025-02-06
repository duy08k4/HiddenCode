import { getDatabase, get, set, ref, child, db } from "./firebase_module.js";
import { md5 } from "./md5.js";

async function getSailting () {
    const dbRef = ref(getDatabase())
    let sailt = get(child(dbRef, "key")).then((snapshot) => {
        if(snapshot.exists()) {
            return snapshot.val().pri_key
        }
    })

    return sailt
}

let md5_key = md5(await getSailting())

export {md5_key}