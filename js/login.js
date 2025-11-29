const btn = document.getElementById("submitBtn");

import { checkUserLogin } from "/js/auth.js";

checkUserLogin()

btn.addEventListener("click", function(e){
    e.preventDefault()
    let data = {
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim()
    }

    fetch("/api/login.php",{method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    }).then(res => res.json())
    .then(response => {
        if(response.status == "ok"){
            localStorage.setItem("user", JSON.stringify({username: data.username, isAdmin: response.isAdmin}))
            window.location.href = "/index.html"
        }
        else if(response.status == "inputErr"){
            console.log("inputErr");
            document.getElementById("passHelp").removeAttribute("hidden")
            document.getElementById("dbErr").setAttribute("hidden", true)
        }
        else{
            document.getElementById("username").setAttribute("hidden", true)
            document.getElementById("password").setAttribute("hidden", true)
            document.getElementById("dbErr").removeAttribute("hidden")
        }
    })
})