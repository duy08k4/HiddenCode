import { showToast } from "./showToast.js"
import { questionsOfProgram } from "./mainProcessing.js"
import { scCode, scMixedCode, suggest, indexSuggest } from "./createScCode.js"
import { child, getDatabase, ref, get, set, db, remove } from "./firebase_module.js"
import { help } from "./help.js"

// let listAnswered = [false, false, false, false, false]
let listAnswered = await get(child(ref(getDatabase()), "recentCode/processQuest")).then((snapshot) => {
    if(snapshot.exists()) {
        let getProcessQuest = snapshot.val().process
        getProcessQuest = getProcessQuest.split("-")

        getProcessQuest.forEach((val, index) => {
            getProcessQuest[index] = JSON.parse(val)
        })

        return getProcessQuest
        
    } else return [false, false, false, false, false]
})
let backToMenu = false

function closeTransfer () {
    document.querySelector(".transferPage").classList.add("active")
}

function openTransfer () {
    document.querySelector(".transferPage").classList.remove("active")
}

function endGame () {
    closeTransfer()
    document.querySelector(".transferPage").classList.add("endGamePage")
}

// Quest Page
function openQuestPage () {
    setTimeout(() => {
        closeTransfer()

        setTimeout(() => {
            document.querySelector(".questPage").setAttribute("style", "display: flex")
            
            setTimeout(() => {
                openTransfer()
            }, 100)
        }, 1000)
    }, 0)    
}

function closeQuestPage () {
    setTimeout(() => {
        closeTransfer()

        setTimeout(() => {
            document.querySelector(".questPage").removeAttribute("style")
            
            setTimeout(() => {
                openTransfer()
            }, 100)
        }, 1000)
    }, 0)    
}

// Set Quest Page
function openSetQuestPage () {
    setTimeout(() => {
        closeTransfer()

        setTimeout(() => {
            document.querySelector(".setQuestPage").setAttribute("style", "display: flex")
            
            setTimeout(() => {
                openTransfer()
            }, 100)
        }, 1000)
    }, 0)    
}

function closeSetQuestPage () {
    setTimeout(() => {
        closeTransfer()

        setTimeout(() => {
            document.querySelector(".setQuestPage").removeAttribute("style")
            
            setTimeout(() => {
                openTransfer()
            }, 100)
        }, 1000)
    }, 0)    
}

// End Game
function endGamePage () {
    setTimeout(() => {
        closeTransfer()

        setTimeout(() => {
            endGame()
        }, 1000)
    }, 0)
}

// Open Check
function check () {
    document.querySelector(".accessPage").setAttribute("style", "display: flex")
}

// All Function
document.querySelector(".settingBtn").addEventListener("click", () => {
    // openSetQuestPage()
    check()
})

document.querySelector(".accessPage--closeBtn").addEventListener("click", () => {
    document.querySelector(".accessPage").removeAttribute("style")
})

document.querySelector(".questionBackBtn").addEventListener("click", () => {
    if(backToMenu === true) {
        closeQuestPage()
        backToMenu = false
    }
})

document.querySelector(".setQuestBtnBack").addEventListener("click", () => {
    closeSetQuestPage()
})


document.querySelector(".announcePage").addEventListener("load", () => {
    document.querySelector(".announcePage").innerHTML = ""
})

function checkInput (inputString) {
    let allSpecial = ["<", ">", "/", "?"]
    var status = false //Mặc định không vi phạm quy tắc
    
    allSpecial.forEach(val => {
        if(inputString.indexOf(val) != -1) {
            showToast("exclamation", `Vui lòng không nhập các ký tự: ${allSpecial.toString()}`)
            status = true
            stop
        }
    })
    
    return status
}
document.querySelectorAll(".questBar--quest").forEach((val, index) => {
    if(questionsOfProgram != "") {
        if(listAnswered[index] == false) {
            val.addEventListener("click", () => {
                handleQuest(index, val)
                setTimeout(() => val.classList.add("done"), 1000)
            }, {once: true})
        } else {
            val.classList.add("done")
        }
    }

    backToMenu = false
})

let checkNumCode = () => {
    let count = listAnswered.filter(item => item == true ).length
    if(count == 0) {
        return 0
    } else if(count <= 3) {
        return count = count
    } else return 3
}
let checkNumIndex = () => {
    let count = listAnswered.filter(item => item == true ).length
    if(count >= 3) {
        return count = count - 3
    }else return 0
}

let numCode = checkNumCode()
let numIndex = checkNumIndex()

function getSuggestion() {
    let result

    if(numCode < 3) {
        result = suggest[numCode][0].toString()
        numCode++
    }else if(numIndex < 2) {
        result = (numIndex + 1).toString() + (+indexSuggest[numIndex] + 1).toString()
        numIndex++
    }
    console.log(`NumCode: ${numCode}`);
    console.log(`NumIndex: ${numIndex}`);
    console.log(`ListAnswered: ${listAnswered}`);
    return result
}

function checkAnswer(indexAnswer, listContentOfAnswer, contentOfTrueAnswer, val) {
    let getContentOfAnswer = listContentOfAnswer[indexAnswer]

    if(val.className.split(" ").length != 3) {
        if(getContentOfAnswer == contentOfTrueAnswer) {
            val.classList.add("right")
            
            document.querySelectorAll(".answer").forEach((val) => {
                let newElement = val.cloneNode(true)
                setTimeout(() => val.parentNode.replaceChild(newElement, val), 200)
            })

            backToMenu = true
            document.querySelector(".showdialog").classList.add("active")
            document.querySelector(".dialog_content").innerHTML = getSuggestion()

            let copyListAnswered = listAnswered.slice()

            copyListAnswered = copyListAnswered.join("-")
            set(ref(db, "recentCode/processQuest"), {
                process: copyListAnswered
            })

            set(ref(db, "recentCode/helping"), {
                help: help.join("-")
            })

            setTimeout(()=> {
                document.querySelector(".showdialog").classList.remove("active")
            }, 4500)
        } else {
            val.classList.add("wrong")
        }
    }
}

async function handleQuest (indexQuest, val) {
    
    if(listAnswered[indexQuest] == false) {
        console.log("OK");
        val.setAttribute("name", "done")
        openQuestPage()
        listAnswered[indexQuest] = true
        // console.log(questionsOfProgram);
        
        document.querySelectorAll(".answer").forEach((val) => {
            let classOfVal = val.className.split(" ")
            if(classOfVal.length == 3) {
                val.classList.remove(classOfVal[classOfVal.length - 1])
            }
        })

        let question = questionsOfProgram[indexQuest]
        let contentOfQuestion = question.questContent
        let listContentOfAnswer = [question.answerA, question.answerB, question.answerC]
        let contentOfTrueAnswer = question.trueAnswer
        console.log(contentOfTrueAnswer);
        console.log(listContentOfAnswer);
        
        document.querySelector(".questionShowcase").innerHTML = contentOfQuestion
    
        document.querySelectorAll(".answerContent").forEach((val, index) => {
            val.innerHTML = listContentOfAnswer[index]
        })

        document.querySelectorAll(".answer").forEach((val) => {
            let newElement = val.cloneNode(true)
            val.parentNode.replaceChild(newElement, val)
        })
    
        document.querySelectorAll(".answer").forEach((val, index) => {
            val.addEventListener("click", () => checkAnswer(index, listContentOfAnswer, contentOfTrueAnswer, val), {once: true})
        })
    }
}

// ResetData
let allRef = ["processQuest", "recentCode"]
document.querySelector(".replayBtn").addEventListener("click", () => {
    document.querySelector(".requestPage").setAttribute("style", "display: flex")
})

document.querySelector(".requestBox--btnCancel").addEventListener("click", () => {
    document.querySelector(".requestPage").removeAttribute("style")
})

document.querySelector(".requestBox--btnConfirm").addEventListener("click", () => {
    allRef.forEach(val => {
        remove(ref(db, `${val}`))
    })

    location.reload()
})

document.querySelector(".endGame--replayButton").addEventListener("click", () => {
    allRef.forEach(val => {
        remove(ref(db, `${val}`))
    })

    set(ref(db, "security/winner"), {
        winner: false
    })

    location.reload()
})
export {openSetQuestPage, checkInput, endGamePage, backToMenu}