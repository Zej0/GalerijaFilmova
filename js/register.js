const btn = document.getElementById("submitBtn")
import { checkUserLogin } from "/js/auth.js"

checkUserLogin()

const imeRegex = /^[A-Z][a-z]{1,19}$/u
const prezimeRegex = /^[A-Z][a-z]{1,19}$/u
const userRegex = /^[\d._]{4,20}$/u
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u
const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[^\w\s])[^\s]{4,20}$/

btn.addEventListener("click", function(e){
    e.preventDefault()

    let data= {
        ime : document.getElementById("ime").value.trim(),
        prezime : document.getElementById("prezime").value.trim(),
        username : document.getElementById("username").value.trim(),
        email : document.getElementById("email").value.trim(),
        password : document.getElementById("password").value.trim(),
        confirmPass : document.getElementById("confirmPass").value.trim(),
        newsletter : document.getElementById("newsletter").checked
    }

    fetch("/api/register.php", {method: "POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(response=>{
        if([response.status = "ok"]){
            localStorage.setItem("user", JSON.stringify(data.username, response.isAdmin))
            window.location.href = "index.html"
        }
        else if([response.message = "duplicate"]){
            err = document.getElementById("dbErr")
            err.removeAttribute("hidden")
            err.innerHTML = "User already exists."
        }
        else{
            err = document.getElementById("dbErr")
            err.removeAttribute("hidden")
            err.innerHTML = "Database error."
        }
    })
})