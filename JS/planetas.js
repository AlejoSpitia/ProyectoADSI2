fetch("https://swapi.co/api/planets/")
    .then(function(response) {
        console.log("Estuvo bien la petición :D  ")
        console.log("Respuesta: ", response)
        response.json().then(function(data) {
            console.log(data)
            document.getElementById("informacion").innerHTML = "<h1>" + data.name + "</h1>"
        })
    })
    .catch(function() {
        console.log("Algo salió mal :(  ")
    })

async function obtenerPlaneta(id) {
    let response = await fetch(`https://swapi.co/api/planets/${id}/`)
    let data = await response.json()
    return data
}

async function obtenerDatos(url) {
    let response = await fetch(url)
    let data = await response.json()
    return data
}

/**
 * Retorna una cadena HTML con una lista de personajes y un botón de anterior y siguiente si recibe las URL
 * @param {string} url API a ser ejecutada 
 */
async function listarPlanetas(url) {
    let lista = `<ul class="collection with-header">
      <li class="collection-header green"><h4>Planetas - Guerra de las Galaxias</h4></li>`
    let planetas = await obtenerDatos(url)
        //let arregloPersonajes = personajes.results //Forma 1 de recorrer el arreglo de resultados
        // for (let i = 0; i < arregloPersonajes.length; i++) {
        //     lista += `<li class="collection-item">
        //     <div>${arregloPersonajes[i].name}</div></li>`
        // }

    for (const planeta of planetas.results) { //Forma 2 de recorrer el arreglo de resultados
        lista += `<li class="collection-item">
         <div><strong> Nombre:</strong> ${planeta.name}. <br> <strong>Tiempo Rotacion: </strong> 
         ${planeta.orbital_period} Dias. <br> <strong>Diametro: </strong>${planeta.diameter} Km2. 
         <br> <strong>Temperatura: </strong>${planeta.climate}.</div></li>`

    }
    lista += '</ul><div class="row">'
    if (planetas.previous) { //Agregar un botón pata la página anterior
        lista += `<div class="col s6"><a id ="btn-ant" 
                class="waves-effect waves-light btn blue"
                data-url="${planetas.previous}"><i class="material-icons left"></i>Anterior</a></div>`

    }
    if (planetas.next) { //Agregar un botón pata la página siguiente
        lista += `<div class="col s6"><a id ="btn-sig" 
                class="waves-effect waves-light btn orange"
                data-url="${planetas.next}"><i class="material-icons right"></i>Siguiente</a></div></div>`
    }
    return lista
}

async function main(url) {
    let list = await listarPlanetas(url)
    document.getElementById("informacion").innerHTML = list
    let btnSig = document.getElementById("btn-sig")
    let btnAnt = document.getElementById("btn-ant")
    if (btnSig) {
        btnSig.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
    if (btnAnt) {
        btnAnt.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
}

main('https://swapi.co/api/planets/')