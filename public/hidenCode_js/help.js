import { getDatabase, ref, set, get, child, db, onChildChanged, onValue } from "./firebase_module.js";
import { backToMenu } from "./main.js";
import { getCP } from "./setQuest.js";
import { md5 } from "./md5.js";

let help = await get(child(ref(db), "recentCode/helping")).then((snapshot) => {
    if(snapshot.exists()) {
        let listHelp = snapshot.val().help.split("-")
        
        listHelp.forEach((ele, index) => {
            listHelp[index] = JSON.parse(ele)
        });

        return listHelp
    } else{
        return [false, false]
    }
})

onValue(ref(db, "security") ,(data) => {
    let userStatus = JSON.parse(data.val().userIsUsing)
    if( userStatus == false) {
        localStorage.removeItem("user")
        document.body.innerHTML = ""
    } else if(userStatus == true) {
        if(document.body.innerHTML == "") {
            location.reload()
        }
    }
})

if(localStorage.getItem("user") != "enable") {
    checkUserStatus()
}

async function checkUserStatus() {
    let checkStatus = await get(child(ref(db),"security")).then((snap) => {
        if(snap.exists()) {
            if(JSON.parse(snap.val().privateOrNot)) {
                return prompt("Admin Password:")
            } else return false
        }
    })

    if(checkStatus != false) {
        if(checkStatus == null || checkStatus == undefined || checkStatus == "") {
            document.body.innerHTML = ""
        } else {
            if(md5(checkStatus) != md5(await getCP())) {
                document.body.innerHTML = ""
            } else {
                localStorage.setItem("user", "enable")
            }
        }
    }
}

let listHelpBtn = ["helpButtonRecomment", "helpButtonRemoveAWrong"]

help.forEach((val, index) => {
    if(val) {
        document.querySelector(`.${listHelpBtn[index]}`).classList.add("chose")
    }
})

document.querySelector(".helpButtonRecomment").addEventListener("click", function() {
    if(!help[0] && !backToMenu) {
        let randomRecomment = Math.floor(Math.random() * 3)
        document.querySelectorAll(".answer")[randomRecomment].setAttribute("style", "background-color: gray")
        
        setTimeout(() => {
            document.querySelectorAll(".answer")[randomRecomment].removeAttribute("style")
        }, 1000)
        help[0] = true
        document.querySelector(".helpButtonRecomment").classList.add("chose")
    }
})

document.querySelector(".helpButtonRemoveAWrong").addEventListener("click", function() {
    if(!help[1] && !backToMenu) {
        let randomRecomment = Math.floor(Math.random() * 3)
        document.querySelectorAll(".answer")[randomRecomment].click()
        
        help[1] = true
        document.querySelector(".helpButtonRemoveAWrong").classList.add("chose")
    }
})

export {help}