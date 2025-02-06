function showToast(toastType, toastMessage) {
    //toast type: check or exclamation

    if(toastMessage != "" && toastType != "") {
        let classToast = ""
        if(toastType == "check") classToast = "toastCheck"
        else classToast = "toastWarn"

        let toast = `
            <div class="toastBox toastActive ${classToast}">
                <div class="toastIcon">
                    <i class="fa-solid fa-${toastType} toastIcon--i"></i>
                </div>

                <div class="toastMessage">
                    <p class="toastMessage--content">${toastMessage}</p>
                </div>
            </div>
        `

        document.querySelector(".announcePage").innerHTML = toast
        setTimeout(() => {
            document.querySelector(".announcePage").innerHTML = ""
        }, 5000);
    }
}

// showToast("exclamation", "Test thành công Warning")

export {showToast}