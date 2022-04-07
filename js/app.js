

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let arreglo = [];


allAddEventListeners();

function allAddEventListeners() {
    // cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);


    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        arreglo = []; // reseteamos el arreglo

        mostrarEnCarrito(); // llamamos a la funcion para mostrar el carrito actualizado
    });
}


// Funciones


// para tomar la card cuando se le hace click en agregar al carrito
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        // si tiene esa clase vamos a tomar todo ese card.
        const cardCompleta = e.target.parentElement.parentElement;

        destructurandoCard(cardCompleta);
    } 
}



// desestructura en un objeto esa card completa
function destructurandoCard(cardC) {
    

    // crea un objeto con los datos obtenidos
    const infoCurso = {
        imagen: cardC.querySelector('img').src,
        titulo: cardC.querySelector('h4').textContent,
        precio: cardC.querySelector('.precio span').textContent,
        id: cardC.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    // ver si ya existe un elemento en el carrito o no...
    const existe = arreglo.some( curso => curso.id === infoCurso.id );

    if(existe) {
        // actualizamos la cantidad
        const aux = arreglo.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;  // retorna objeto con cantidad actualizada
            } else {
                return curso;  // retorna los objetos no duplicados
            }
        });

        arreglo = [...aux];

    } else {
        // lo agregamos al carrito
        arreglo = [...arreglo, infoCurso];
    }


    mostrarEnCarrito(arreglo);
}



// para mostrar en el carrito
function mostrarEnCarrito() {

    // limpiar el carrito
    limpiaCarrito();

    // funcion que recorre el arreglo y los va agregando al carrito
    arreglo.forEach( curso => {

        // destructurar
        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>

            <td>
                ${titulo}
            </td>

            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // agrega el contenido al carrito
        contenedorCarrito.appendChild(row);
    });
}



// funcion para limpiar el carrito
function limpiaCarrito() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



// eliminar un curso del carrito
function eliminarCurso(e) {

    const aux = e.target.classList.contains('borrar-curso');

    if(aux) {
        const idAux = e.target.getAttribute('data-id');

        // eliminar del arreglo por el data-id
        arreglo = arreglo.filter( curso => curso.id !== idAux);


        // una vez eliminado llamamos la funcion para mostrar en el
        // carrito
        mostrarEnCarrito();
    }
}
