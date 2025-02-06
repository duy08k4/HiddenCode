import { endGamePage } from "./main.js"
import { scCode } from "./createScCode.js"
import { child, db, set, get, getDatabase, ref } from "./firebase_module.js"
let firstNumber = 0
let secondNumber = 0
let thirdNumber = 0

let numberOfLock = [firstNumber, secondNumber, thirdNumber]

function updateLock(numberOfLock) {
    document.querySelectorAll(".giftMainFace--numberBox--numberContent").forEach((val, index) => {
        val.innerHTML = numberOfLock[index]
    })
}

document.querySelectorAll(".giftMainFace---buttonBox--button").forEach((val, index) => {
    val.addEventListener("click", () => {
        if(numberOfLock[index] == 9) {
            numberOfLock[index] = 0
        } else {
            numberOfLock[index] += 1
        }
        updateLock(numberOfLock)
    })
})

document.querySelector(".giftMainFace--numberBox").addEventListener("click", () => {
    let checkCode = numberOfLock.join("")

    if(+checkCode == scCode) {
        console.log("Yes");
        document.querySelector(".giftTopFace").classList.add("active")

        setTimeout(() => {
            endGamePage()
            set(ref(db, "security/winner"), {
                winner: true
            })
        }, 1000)

        setTimeout(() => {
            document.querySelector(".giftTopFace").classList.remove("active")
        }, 2000)
    }
})

get(child(ref(getDatabase()), "security/winner")).then((snapshot) => {
    if(snapshot.exists()) {
        if(JSON.parse(snapshot.val().winner) == true) {
            endGamePage()
        }
    } else {
        set(ref(db, "security/winner"), {
            winner: false
        })
    }
})