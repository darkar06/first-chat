        var name;
        const socket = io()

        console.log("a")

        const viewport = document.querySelector(".viewport")
        const modal = document.querySelector(".modal__background")
        const content = document.querySelector(".content")
        const form = document.querySelector(".form")

        const actions = document.querySelector(".actions")

        // --- user Name ---

        const addNameForm = document.querySelector(".add__name")
        const userName = document.querySelector(".userName");

        addNameForm.addEventListener("submit", e =>{
            e.preventDefault()
            name = userName.value;
            socket.emit("user:connected",name)
            modal.style.display =  "none"
        })

        form.addEventListener("submit",(e)=>{
            e.preventDefault()
            socket.emit("New:message",{
                userName: name,
                content: content.value
            })
            
            content.value = ""
        })

        content.addEventListener("keypress", e=> {

            socket.emit("chat:typing", name)
        })

        socket.on("chat:typing",name =>{
        actions.innerHTML = `<span class="typing">${name} esta escribiendo</span>`
        })

        socket.on("user:connected",(userName)=>{
            viewport.innerHTML += `
            <div class="message__server">
                 <h3>server</h3>
                 <p>se ha conectado el usuario "${userName}", dale un saludo de nuestra parte</p>
            </div>`
            
            viewport.scrollTo(0, viewport.scrollHeight)
        })

        socket.on("New:message",({userName,content})=>{
            const div = document.createElement("div")
            const h3 = document.createElement("h3")
            const p = document.createElement("p")

            const contenido = document.createTextNode(content)
            const nombreDeUsuario = document.createTextNode(userName)

            h3.appendChild(nombreDeUsuario)
            p.appendChild(contenido)
            div.appendChild(h3)
            div.appendChild(p)

            div.classList.add("message")

            viewport.appendChild(div)
            actions.innerHTML = `<span class="typing">nadie esta escribiendo en estos momentos</span>`
            
            viewport.scrollTo(0, viewport.scrollHeight)
        })