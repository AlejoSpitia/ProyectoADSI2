let h3 = document.getElementById("h3")
h3.style.textAlign = "center"
h3.style.fontFamily = "arial black"

let h4 = document.getElementById("h4")
h4.style.textAlign = "center"
h4.style.fontFamily = "arial black"

let his = document.getElementsByClassName("his")
for (let i = 0; i < his.length; i++) {

    his[i].style.color = 'green'
    his[i].style.fontFamily = 'arial'
    his[i].style.textJustify = 'justify'
    his[i].style.fontSize = '11pt'
}

let body = document.querySelector("body")
body.style.backgroundImage = "url('img/fondo.jpeg')"
body.style.backgroundAttachment = "fixed"
body.style.backgroundSize = "100% 100%"