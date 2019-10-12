fetch("https://api.punkapi.com/v2/beers/")
    .then(function(response) {
        console.log("Estuvo bien la petición :D  ")
        console.log("Respuesta: ", response)
        response.json().then(function(data) {
            console.log(data)
            document.getElementById("beers").innerHTML = "<h1>" + data.name + "</h1>"
        })
    })
    .catch(function() {
        console.log("Algo salió mal :(  ")
    })

async function obtenerCerveza(id) {
    let response = await fetch(`https://api.punkapi.com/v2/beers/${id}/`)
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
async function listarCervezas(url) {
    let lista = `<ul class="collection with-header">
      <li class="collection-header green"><h4>Las Mejores Cervezas</h4></li>`
    let cervezas = await obtenerDatos(url)
        //let arregloPersonajes = personajes.results //Forma 1 de recorrer el arreglo de resultados
        // for (let i = 0; i < arregloPersonajes.length; i++) {
        //     lista += `<li class="collection-item">
        //     <div>${arregloPersonajes[i].name}</div></li>`
        // }

    for (const cerveza of cervezas) { //Forma 2 de recorrer el arreglo de resultados
        lista += `<li class="collection-item">
         <div><strong> Nombre:</strong> ${cerveza.name}. <br> <strong>Lema: </strong> 
         ${cerveza.tagline}. <br> <strong>Primera Cerveza: </strong>${cerveza.first_brewed}. 
         <br> <strong>Descripcion: </strong>${cerveza.description}.</div></li>`

    }

    lista += '</ul><div class="row">'
    if (cervezas.previous) { //Agregar un botón pata la página anterior
        lista += `<div class="col s6"><a id ="btn-anterior" 
                class="waves-effect waves-light btn blue"
                data-url="${cervezas.previous}"><i class="material-icons left"></i>Anterior</a></div>`

    }
    if (cervezas.next) { //Agregar un botón pata la página siguiente
        lista += `<div class="col s6"><a id ="btn-siguiente" 
                class="waves-effect waves-light btn orange"
                data-url="${cervezas.next}"><i class="material-icons right"></i>Siguiente</a></div></div>`
    }
    return lista
}


async function main(url) {
    let lista = await listarCervezas(url)
    document.getElementById("beers").innerHTML = lista
    let btnSiguiente = document.getElementById("btn-siguiente")
    let btnAnterior = document.getElementById("btn-anterior")
    if (btnSiguiente) {
        btnSiguiente.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
    if (btnAnterior) {
        btnAnterior.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
}

main('https://api.punkapi.com/v2/beers/')