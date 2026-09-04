// ==========================================
// UNIR CATÁLOGO
// ==========================================

const productos = [
    ...suplementos,
    ...vitaminas
];


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const contenedorProductos =
    document.getElementById("lista-productos");

const buscador =
    document.getElementById("buscar-producto");

const botonesFiltro =
    document.querySelectorAll(".filtro");

const sinResultados =
    document.getElementById("sin-resultados");


let categoriaActual = "Todos";


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos(lista) {

    contenedorProductos.innerHTML = "";


    if (lista.length === 0) {

        sinResultados.style.display = "block";

        return;
    }


    sinResultados.style.display = "none";


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");


        tarjeta.className =
            "producto-card";


        // BOTÓN

        const boton = producto.disponible

            ? `
                <button
                    class="btn-agregar"
                    onclick="agregarAlCarrito(${producto.id})"
                >
                    Agregar →
                </button>
              `

            : `
                <button
                    class="btn-agotado"
                    disabled
                >
                    Agotado
                </button>
              `;


        // TARJETA

        tarjeta.innerHTML = `

            <div class="producto-imagen-wrap">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="producto-imagen"
                >

            </div>


            <div class="producto-info">

                <span class="producto-categoria">
                    ${producto.categoria}
                </span>


                <span class="producto-marca">
                    ${producto.marca}
                </span>


                <h3>
                    ${producto.nombre}
                </h3>


                <p class="producto-presentacion">
                    Presentación: ${producto.presentacion}
                </p>


                <div class="producto-footer">

                    <span class="producto-precio">
                        Consultar
                    </span>


                    ${boton}

                </div>

            </div>

        `;


        contenedorProductos.appendChild(
            tarjeta
        );

    });

}


// ==========================================
// FILTRAR
// ==========================================

function filtrarProductos() {

    const texto =
        buscador.value
            .toLowerCase()
            .trim();


    const filtrados =
        productos.filter(producto => {


            const coincideTexto =

                producto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.marca
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.presentacion
                    .toLowerCase()
                    .includes(texto);


            const coincideCategoria =

                categoriaActual === "Todos"

                ||

                producto.categoria ===
                categoriaActual;


            return (
                coincideTexto &&
                coincideCategoria
            );

        });


    mostrarProductos(filtrados);

}


// ==========================================
// BUSCADOR
// ==========================================

buscador.addEventListener(
    "input",
    filtrarProductos
);


// ==========================================
// FILTROS
// ==========================================

botonesFiltro.forEach(boton => {

    boton.addEventListener(
        "click",
        () => {


            botonesFiltro.forEach(btn => {

                btn.classList.remove(
                    "activo"
                );

            });


            boton.classList.add(
                "activo"
            );


            categoriaActual =
                boton.dataset.categoria;


            filtrarProductos();

        }
    );

});


// ==========================================
// CARRITO
// ==========================================

function agregarAlCarrito(id) {

    const producto =
        productos.find(
            producto =>
                producto.id === id
        );


    if (!producto) {
        return;
    }


    let carrito =

        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];


    const existente =

        carrito.find(
            item =>
                item.id === id
        );


    if (existente) {

        existente.cantidad += 1;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            marca: producto.marca,

            presentacion:
                producto.presentacion,

            precio: 0,

            imagen:
                producto.imagen,

            cantidad: 1

        });

    }


    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();

}


// ==========================================
// CONTADOR
// ==========================================

function actualizarContadorCarrito() {

    const contador =

        document.getElementById(
            "contador-carrito"
        );


    if (!contador) {
        return;
    }


    const carrito =

        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];


    const total =

        carrito.reduce(

            (suma, producto) =>
                suma +
                producto.cantidad,

            0

        );


    contador.textContent = total;

}


// ==========================================
// INICIAR
// ==========================================

mostrarProductos(productos);

actualizarContadorCarrito();