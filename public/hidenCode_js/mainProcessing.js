import { getDatabase, get, set, ref, child, db } from "./firebase_module.js";

// Random Question
async function getRandomQuestKey() {
    const dbRef = ref(getDatabase())
    let defaultAmount = 5
    let arrKey = []
    let listKey = []
    
    await get(child(dbRef, "questCode")).then((snapshot) => {
        if(snapshot.exists()) {
            snapshot.forEach(snap => {
                // console.log(snap.val());
                listKey.push(snap.val().quest)
            });
        }
    })

    for(var i = 0; i < defaultAmount; i++) {
        let randomIndex = Math.floor(Math.random() * listKey.length)
        let getRandomKey = listKey[randomIndex]

        if(arrKey.indexOf(getRandomKey) == -1) {
            arrKey.push(getRandomKey)
            listKey.splice(randomIndex, 1)
        }
    }

    return arrKey
}

// Load Question
async function loadQuest(listQuestKey) {
    let listQuest = []

    for(var i = 0; i < listQuestKey.length; i++) {
        await get(child(ref(getDatabase()), `questions/${listQuestKey[i]}`)).then((snapshot) => {
            if(snapshot.exists()) {
                listQuest.push(snapshot.val())
                
                // return snapshot.val()
            } 
        })
    }

    return listQuest
}

// Processing
async function mainProcessLoad() {
    
    let checkProcess = await get(child(ref(getDatabase()), "processQuest")).then((snapshot) => {
        if(snapshot.exists()) {
            return true
        }else {
            return false
        }
    })
    
    if(checkProcess == true) {
        let listQuest = []
        await get(child(ref(getDatabase()), "processQuest")).then((snapshot) => {
           snapshot.forEach(snap => {
            listQuest.push(snap.val())
           })
        })

        return listQuest
    } else {
        let listQuest = await loadQuest(await getRandomQuestKey())

        for(var i = 0; i < listQuest.length; i++) {
            set(ref(db, `processQuest/${listQuest[i].questCode}`), listQuest[i])
        }
        
        return listQuest
    }
}

let questionsOfProgram = await mainProcessLoad()
export {questionsOfProgram}