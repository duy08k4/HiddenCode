import { get, set, ref, child, db, getDatabase, push, onValue, remove, update } from "./firebase_module.js";
import { showToast } from "./showToast.js";
import { openSetQuestPage, checkInput } from "./main.js";
import { md5_key } from "./salting.js";
import { md5 } from "./md5.js";

document.querySelector(".accessBox--checkBtn").addEventListener("click", checkFunc)

// Check Pass
async function  getCP () {
    const dbRef = ref(getDatabase())
    let CP = get(child(dbRef, "security")).then((snapshot) => {
        if(snapshot.exists()) {
            return snapshot.val().sc_ps
        } else return null
    })

    return CP
}

async function checkFunc() {
    let passInputCheck = document.querySelector(".accessBox--input").value
    let getDataCP = md5(await getCP() + md5_key)
    let checkDataInput = checkInput(passInputCheck)

    if(passInputCheck == "") {
        showToast("exclamation", "Vui lòng nhập mật khẩu !")
        document.querySelector(".accessBox--input").value = ""
    }else if(!checkDataInput) {
        let hashPassInputCheck = md5(passInputCheck + md5_key)
        if(hashPassInputCheck == getDataCP) {
            openSetQuestPage()
            eventDelete()

            // Reset form
            setTimeout(() => {
                document.querySelector(".accessBox--input").value = ""
                document.querySelector(".accessPage--closeBtn").click()
            }, 1500)
        }
        else showToast("exclamation", "Kiểm tra thất bại !")
    } else {document.querySelector(".accessBox--input").value}
}

// Load Question
async function loadQuestion() {
    let viewQuestScreen = document.querySelector(".viewQuest--questScreen")
    viewQuestScreen.innerHTML = ""
    const dbRef = ref(getDatabase())
    await get(child(dbRef, "questions")).then((snapshot) => {

        let quantityOfQuest = Object.keys(snapshot.val()).length
        document.querySelector(".amountQuestContent").innerHTML = quantityOfQuest
        if(snapshot.exists()) {
            snapshot.forEach(val => {
                let answerACheck = val.val().answerA == val.val().trueAnswer
                let answerBCheck = val.val().answerB == val.val().trueAnswer
                let answerCCheck = val.val().answerC == val.val().trueAnswer
    
                let viewQuest = `
                    <div class="viewQuest--questBox">
                        <div class="viewQuest--questBox--questContent">
                            <p>${val.val().questContent}</p>
    
                            <button class="deleteQuest" name="${val.val().questCode}">Delete</button>
                        </div>
                        <div class="viewQuest--questBox--answerForm">
                            <div class="viewQuest--questBox--answerBox">
                                <div class="viewQuest--questBox--answerBox--title">
                                    <p>A</p>
                                </div>
                                <div class="viewQuest--questBox--answerBox--answer">
                                    <p>${val.val().answerA}</p>
                                </div>
                                <div class="viewQuest--questBox--answerBox--status"><i class="fas fa-${answerACheck ? "check" : "times"}"></i></div>
                            </div>
    
                            <div class="viewQuest--questBox--answerBox">
                                <div class="viewQuest--questBox--answerBox--title">
                                    <p>B</p>
                                </div>
                                <div class="viewQuest--questBox--answerBox--answer">
                                    <p>${val.val().answerB}</p>
                                </div>
                                <div class="viewQuest--questBox--answerBox--status"><i class="fas fa-${answerBCheck ? "check" : "times"}"></i></div>
                            </div>
    
                            <div class="viewQuest--questBox--answerBox">
                                <div class="viewQuest--questBox--answerBox--title">
                                    <p>C</p>
                                </div>
                                <div class="viewQuest--questBox--answerBox--answer">
                                    <p>${val.val().answerC}</p>
                                </div>
                                <div class="viewQuest--questBox--answerBox--status"><i class="fas fa-${answerCCheck ? "check" : "times"}"></i></div>
                            </div>
                        </div>
                    </div>
                `
    
                viewQuestScreen.innerHTML += viewQuest
            })
        }
    })

}

// Add event click to remove
async function eventDelete() {
    await loadQuestion()

    document.querySelectorAll(".deleteQuest").forEach(val => {
        val.addEventListener("click", () => {removeQuest(val.name)})
    })

}

// Remove Question
function removeQuest(questCode) {
    get(ref(db, "questCode")).then((snapshot) => {
        if(snapshot.exists()) {
            snapshot.forEach(snap => {
                let snapVal = snap.val().quest

                if(snapVal == questCode) {
                    let snapValKey = snap.ref._path.pieces_[1]

                    remove(ref(db, `questCode/${snapValKey}`)).then(() => {
                        remove(ref(db, `questions/${snapVal}`)).then(() => {
                            showToast("check", "Đã xóa câu hỏi")
                            eventDelete()
                            return
                        })
                    })
                }
            })
        }
    })
}

// Create QuestCode
function createQuestCode(questContent, questKey) {
    let date = new Date()
    let time = date.getDay.toString() + date.getMonth().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString()
    
    let questContentArr = questContent.split("")
    let countLoop = questContentArr.length

    while (countLoop > 0) {
        let firstIndex = Math.floor(Math.random() * questContentArr.length)
        let secondIndex = Math.floor(Math.random() * questContentArr.length)

        let temp = questContentArr[firstIndex]
        questContentArr[firstIndex] = questContentArr[secondIndex]
        questContentArr[secondIndex] = temp
        countLoop -= 1
    }

    let questCode = md5(md5(time) + questContentArr.toString() + questKey)
    return questCode
}

// Set Questions
document.querySelector(".setQuestBtnAdd").addEventListener("click", setQuestion)
async function addQuest(questContent, questAnswer, questAnswerCheck, questTitle) {
    const dbRef = ref(getDatabase())
    let getQuestKey = await get(child(dbRef, "key")).then((snapshot) => {
        if(snapshot.exists()) {
            return md5(snapshot.val().quest_key)
        }
    })

    let questCode = createQuestCode(questContent, getQuestKey)

    // Set Question List
    await push(child(dbRef, "questCode"), {
        quest: questCode
    })

    // Set Question Content
    let questionData = {
        questContent: questContent,
        questCode: questCode
    }

    questAnswer.forEach((val, index) => {
        questionData[`answer${questTitle[index]}`] = val
    })

    questionData["trueAnswer"] = questAnswer[questAnswerCheck.indexOf(true)]
    
    set(ref(db, `questions/${questCode}`), questionData).then(() => {
        showToast("check", "Đã thêm câu hỏi")
        eventDelete()
    })
}

async function setQuestion() {
    let questContent = document.querySelector(".questContentInput").value
    let allCheckBox = document.querySelectorAll(".answerCheck")
    let answer = []
    let answerTitle = []
    let answerCheck = []

    document.querySelectorAll(".setQuestBox--answerContentInput").forEach((val, index) => {
        answer.push(val.value.trim())
        answerTitle.push(val.name)
        let getCheckBox = allCheckBox[index]

        if(getCheckBox.checked == true) {
            answerCheck.push(true)
        } else answerCheck.push(false)
    })

    if(questContent != "") {
        if(answer.indexOf("") == -1) {
            if(answerCheck.indexOf(true) != -1) {
                await addQuest(questContent, answer, answerCheck, answerTitle)

                // Reset form
                document.querySelector(".questContentInput").value = ""
                document.querySelectorAll(".answerCheck").forEach(val => val.checked = false)
                document.querySelectorAll(".setQuestBox--answerContentInput").forEach(val => val.value = "")
            } else {
                showToast("exclamation", "Vui lòng chọn 1 đáp án đúng !")
            }
        } else {
            showToast("exclamation", "Vui lòng điền đầy đủ các đáp án !")
            return
        }
    }else {
        showToast("exclamation", "Vui lòng điền câu hỏi !")
        return
    }
}

export {getCP}