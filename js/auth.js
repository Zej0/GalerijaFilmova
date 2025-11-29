export function checkUser(){
    const loggedInHeader = document.getElementsByClassName("logged-in")
    const loginItems = document.getElementsByClassName("login-item")
    const ItemsArray = Array.from(loginItems)
    const HeaderArray = Array.from(loggedInHeader)

        const activeUser = localStorage.getItem("user")
        if(activeUser){
            ItemsArray.forEach(element => {
                element.setAttribute("hidden", true)
            });
            HeaderArray.forEach(element => {
                element.removeAttribute("hidden")
            });
        }
        else{
            HeaderArray.forEach(element => {
                element.setAttribute("hidden", true)
            })
            ItemsArray.forEach(element => {
                element.removeAttribute("hidden")
            });
        }
}
export function checkUserLogin(){
    if(localStorage.getItem("user")){
        window.location.href = "/index.html"
    }
}

export function redirect(){
    if(!localStorage.getItem("user")){
        window.location.href = "/index.html"
    }
}