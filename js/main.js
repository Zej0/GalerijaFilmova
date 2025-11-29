import { checkUser, redirect } from "/js/auth.js"
import { loadAllMovies, MainPageMovies } from "/js/filmovi.js"

checkUser()

if(window.location.pathname != "/index.html"){
    redirect()
}

if(window.location.pathname === "/index.html"){
    MainPageMovies()
}

if(window.location.pathname === "/filmovi.html"){
    loadAllMovies()
}

document.getElementById("logoutBtn").addEventListener("click", function(e){
    e.preventDefault()
    localStorage.removeItem("user")
    location.reload(true)
})
