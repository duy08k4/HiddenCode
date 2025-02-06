import { getDatabase, get, set, ref, child, db } from "./firebase_module.js"

async function createScCode() {
    let [code, mixedCode] = await get(child(ref(getDatabase()), "recentCode")).then((snapshot) => {
        if(snapshot.exists()) {
            let randomedCode = snapshot.val().code
            let mixCode = snapshot.val().mixCode

            mixCode = mixCode.split("-")
            mixCode.forEach((val, index) => {
                mixCode[index] = val.split("")
            })

            return [randomedCode, mixCode]
        }else {
            let check = true
            let randomCode = Math.floor(Math.random() * 999) + 100

            while(randomCode < 100 || randomCode > 999) {
                randomCode = Math.floor(Math.random() * 999) + 100
            }
            
            let randomCodeArr = randomCode.toString().split("")
            let listNumOfCode = []

            randomCodeArr.forEach((val, index) => {
                listNumOfCode.push([val, index])
            });
            
            while(true) {
                listNumOfCode.forEach(val => {
                    let firstI = Math.floor(Math.random() * listNumOfCode.length)
                    let secondI = Math.floor(Math.random() * listNumOfCode.length)

                    let temp = listNumOfCode[firstI]
                    listNumOfCode[firstI] = listNumOfCode[secondI]
                    listNumOfCode[secondI] = temp
                })
    
                let listCheckRank = []
    
                randomCodeArr.forEach((val, index) => {
                    if(val == listNumOfCode[index][0]) {
                        listCheckRank.push(true)
                    }else listCheckRank.push(false)
                })
    
                let countSamePos = 0 //Quantity of same value
                listCheckRank.forEach(val => {
                    if(val == true) {
                        countSamePos++
                    }
                })

                const constRandomCode = listNumOfCode

                if(countSamePos <= 1) {
                    listNumOfCode.forEach((val, index) => {
                        listNumOfCode[index] = val.join("")
                    })

                    listNumOfCode = listNumOfCode.join("-")

                    set(ref(db, "recentCode"), {
                        code: randomCode,
                        mixCode: listNumOfCode
                    })

                    return [randomCode, constRandomCode]
                }
            }

        }
    })
    let mixedCodeCopy = mixedCode.slice()
    let [suggestCreated, indexSuggestCreate] = await get(child(ref(getDatabase()), "recentCode/processSuggest")).then((snapshot) => {
        if(snapshot.exists()) {
            let listSuggest = snapshot.val().listSuggest
            let listIndexSuggest = snapshot.val().listIndexSuggest
    
            listSuggest = listSuggest.split("-")
            listSuggest.forEach((val, index) => {
                listSuggest[index] = val.split("")
            })
    
            listIndexSuggest = listIndexSuggest.split("-")
    
            return [listSuggest, listIndexSuggest]
        } else {
            let listSuggest = []
            let listIndexSuggest = []
            
            let indexRandomed = []
            
            while(indexRandomed.length < 3) {
                let randomSuggestIndex = Math.floor(Math.random() * 3)
            
                if(indexRandomed.length === 0 && randomSuggestIndex != 0) {
                    indexRandomed.push(randomSuggestIndex)
                    listSuggest.push(mixedCodeCopy[randomSuggestIndex])
                    listIndexSuggest.push(mixedCodeCopy[randomSuggestIndex][1])
                    
                } else {
                    if(indexRandomed.indexOf(randomSuggestIndex) == -1 && indexRandomed.length > 0) {
                        listSuggest.push(mixedCodeCopy[randomSuggestIndex])
                        listIndexSuggest.push(mixedCodeCopy[randomSuggestIndex][1])
                        indexRandomed.push(randomSuggestIndex)
                    }
                }
            }
            
            let copyListSuggest = listSuggest.slice()
            let copyListIndexSuggest = listIndexSuggest.slice().join("-")
            
            copyListSuggest = copyListSuggest.join("-")
            
            const processSuggestion = {
                listSuggest: copyListSuggest,
                listIndexSuggest: copyListIndexSuggest
            }
            
            set(ref(db, "recentCode/processSuggest"), processSuggestion)
            
            return [listSuggest, listIndexSuggest]
    
        }
    })

    
    return [code, mixedCode, suggestCreated, indexSuggestCreate]
}

let [scCode, scMixedCode, suggest, indexSuggest] = await createScCode()


export {scCode, scMixedCode, suggest, indexSuggest}