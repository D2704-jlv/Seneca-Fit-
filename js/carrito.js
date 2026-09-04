// =========================================================
// SÉNECA FIT - CARRITO
// =========================================================


// =========================================================
// ELEMENTOS DEL HTML
// =========================================================

const carritoContenido =
    document.getElementById("carrito-contenido");

const carritoVacio =
    document.getElementById("carrito-vacio");

const carritoResumen =
    document.getElementById("carrito-resumen");

const carritoTotal =
    document.getElementById("carrito-total");

const contadorCarrito =
    document.getElementById("contador-carrito");

const btnWhatsapp =
    document.getElementById("btn-whatsapp");


// =========================================================
// ESCAPAR TEXTO
// Evita que contenido manipulado en localStorage se
// interprete como HTML dentro del carrito.
// =========================================================

function escaparHTML(valor) {

    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================================================
// VALIDAR RUTA DE IMAGEN
// Solo se permiten imágenes locales de productos.
// =========================================================

function validarImagen(imagen) {

    const ruta =
        String(imagen || "").trim();


    if (
        ruta.startsWith(
            "img/productos/"
        )
    ) {

        return ruta;

    }


    return "";

}


// =========================================================
// NORMALIZAR PRODUCTO DEL CARRITO
// =========================================================

function normalizarProducto(producto) {

    if (
        !producto ||
        typeof producto !== "object"
    ) {

        return null;

    }


    const id =
        Number(producto.id);


    const cantidad =
        Math.max(
            1,
            Math.min(
                Number(producto.cantidad) || 1,
                99
            )
        );


    const precio =
        Math.max(
            0,
            Number(producto.precio) || 0
        );


    if (
        !Number.isFinite(id)
    ) {

        return null;

    }


    return {

        id: id,

        nombre:
            String(
                producto.nombre || ""
            ).slice(0, 120),

        marca:
            String(
                producto.marca || ""
            ).slice(0, 120),

        presentacion:
            String(
                producto.presentacion || ""
            ).slice(0, 120),

        precio: precio,

        imagen:
            validarImagen(
                producto.imagen
            ),

        cantidad: cantidad

    };

}


// =========================================================
// OBTENER CARRITO
// =========================================================

function obtenerCarrito() {

    try {

        const carritoGuardado =
            localStorage.getItem(
                "carrito"
            );


        if (!carritoGuardado) {

            return [];

        }


        const datos =
            JSON.parse(
                carritoGuardado
            );


        if (!Array.isArray(datos)) {

            return [];

        }


        return datos
            .map(
                normalizarProducto
            )
            .filter(Boolean);

    }

    catch (error) {

        console.error(
            "Error al leer el carrito:",
            error
        );


        return [];

    }

}


// =========================================================
// GUARDAR CARRITO
// =========================================================

function guardarCarrito(carrito) {

    try {

        const carritoSeguro =
            carrito
                .map(
                    normalizarProducto
                )
                .filter(Boolean);


        localStorage.setItem(
            "carrito",
            JSON.stringify(
                carritoSeguro
            )
        );

    }

    catch (error) {

        console.error(
            "Error al guardar el carrito:",
            error
        );

    }

}


// =========================================================
// OBTENER PRECIO
// =========================================================

function obtenerPrecio(producto) {

    const precio =
        Number(
            producto.precio
        ) || 0;


    if (precio <= 0) {

        return "Consultar precio";

    }


    return `$${precio.toFixed(2)}`;

}


// =========================================================
// MOSTRAR CARRITO
// =========================================================

function mostrarCarrito() {

    const carrito =
        obtenerCarrito();


    if (!carritoContenido) {

        return;

    }


    carritoContenido.innerHTML =
        "";


    // =====================================================
    // CARRITO VACÍO
    // =====================================================

    if (
        carrito.length === 0
    ) {

        if (carritoVacio) {

            carritoVacio.style.display =
                "block";

        }


        if (carritoResumen) {

            carritoResumen.style.display =
                "none";

        }


        actualizarContador();


        return;

    }


    // =====================================================
    // CARRITO CON PRODUCTOS
    // =====================================================

    if (carritoVacio) {

        carritoVacio.style.display =
            "none";

    }


    if (carritoResumen) {

        carritoResumen.style.display =
            "flex";

    }


    carrito.forEach(
        producto => {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "carrito-item";


            const precioTexto =
                obtenerPrecio(
                    producto
                );


            const nombreSeguro =
                escaparHTML(
                    producto.nombre
                );


            const marcaSegura =
                escaparHTML(
                    producto.marca
                );


            const presentacionSegura =
                escaparHTML(
                    producto.presentacion
                );


            const imagenSegura =
                escaparHTML(
                    validarImagen(
                        producto.imagen
                    )
                );


            const idSeguro =
                Number(
                    producto.id
                );


            const cantidadSegura =
                Number(
                    producto.cantidad
                ) || 1;


            item.innerHTML = `

                <div class="carrito-item-imagen">

                    ${
                        imagenSegura

                        ? `
                            <img
                                src="${imagenSegura}"
                                alt="${nombreSeguro}"
                                loading="lazy"
                            >
                          `

                        : ""
                    }

                </div>


                <div class="carrito-item-info">

                    <span>
                        ${marcaSegura}
                    </span>

                    <h3>
                        ${nombreSeguro}
                    </h3>

                    <p>
                        ${presentacionSegura}
                    </p>

                </div>


                <div class="carrito-item-precio">

                    ${precioTexto}

                </div>


                <div class="carrito-cantidad">

                    <button
                        type="button"
                        onclick="cambiarCantidad(${idSeguro}, -1)"
                        aria-label="Disminuir cantidad"
                    >
                        −
                    </button>


                    <span>
                        ${cantidadSegura}
                    </span>


                    <button
                        type="button"
                        onclick="cambiarCantidad(${idSeguro}, 1)"
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="carrito-eliminar"
                    onclick="eliminarProducto(${idSeguro})"
                    aria-label="Eliminar producto"
                >
                    ×
                </button>

            `;


            carritoContenido
                .appendChild(
                    item
                );

        }
    );


    actualizarTotal();

    actualizarContador();

}


// =========================================================
// CAMBIAR CANTIDAD
// =========================================================

function cambiarCantidad(
    id,
    cambio
) {

    let carrito =
        obtenerCarrito();


    const producto =
        carrito.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!producto) {

        return;

    }


    producto.cantidad =
        (
            Number(
                producto.cantidad
            ) || 1
        ) + cambio;


    if (
        producto.cantidad <= 0
    ) {

        carrito =
            carrito.filter(
                item =>
                    Number(item.id) !==
                    Number(id)
            );

    }


    else {

        producto.cantidad =
            Math.min(
                producto.cantidad,
                99
            );

    }


    guardarCarrito(
        carrito
    );


    mostrarCarrito();

}


// =========================================================
// ELIMINAR PRODUCTO
// =========================================================

function eliminarProducto(id) {

    let carrito =
        obtenerCarrito();


    carrito =
        carrito.filter(
            producto =>
                Number(producto.id) !==
                Number(id)
        );


    guardarCarrito(
        carrito
    );


    mostrarCarrito();

}


// =========================================================
// ACTUALIZAR CONTADOR
// =========================================================

function actualizarContador() {

    const carrito =
        obtenerCarrito();


    const cantidadTotal =
        carrito.reduce(

            (
                total,
                producto
            ) => {

                return total +
                    (
                        Number(
                            producto.cantidad
                        ) || 0
                    );

            },

            0

        );


    if (contadorCarrito) {

        contadorCarrito.textContent =
            cantidadTotal;

    }

}


// =========================================================
// ACTUALIZAR TOTAL
// =========================================================

function actualizarTotal() {

    if (!carritoTotal) {

        return;

    }


    const carrito =
        obtenerCarrito();


    if (
        carrito.length === 0
    ) {

        carritoTotal.textContent =
            "$0.00";


        return;

    }


    const todosTienenPrecio =
        carrito.every(
            producto =>
                Number(
                    producto.precio
                ) > 0
        );


    if (!todosTienenPrecio) {

        carritoTotal.textContent =
            "Consultar precio";


        return;

    }


    const total =
        carrito.reduce(

            (
                acumulado,
                producto
            ) => {

                const precio =
                    Number(
                        producto.precio
                    ) || 0;


                const cantidad =
                    Number(
                        producto.cantidad
                    ) || 0;


                return acumulado +
                    (
                        precio *
                        cantidad
                    );

            },

            0

        );


    carritoTotal.textContent =
        `$${total.toFixed(2)}`;

}


// =========================================================
// CREAR MENSAJE PARA WHATSAPP
// =========================================================

function crearMensajeWhatsApp() {

    const carrito =
        obtenerCarrito();


    let mensaje =
        "";


    mensaje +=
        "Hola, Séneca Fit.\n\n";


    mensaje +=
        "Quisiera solicitar información sobre los siguientes productos:\n\n";


    carrito.forEach(
        (
            producto,
            index
        ) => {

            const precio =
                Number(
                    producto.precio
                ) || 0;


            const cantidad =
                Number(
                    producto.cantidad
                ) || 1;


            mensaje +=
                `${index + 1}. ${producto.nombre}\n`;


            if (
                producto.marca
            ) {

                mensaje +=
                    `Marca: ${producto.marca}\n`;

            }


            if (
                producto.presentacion
            ) {

                mensaje +=
                    `Presentación: ${producto.presentacion}\n`;

            }


            mensaje +=
                `Cantidad: ${cantidad}\n`;


            if (
                precio > 0
            ) {

                mensaje +=
                    `Precio unitario: $${precio.toFixed(2)}\n`;

            }

            else {

                mensaje +=
                    "Precio: Consultar\n";

            }


            mensaje +=
                "\n";

        }
    );


    // =====================================================
    // TOTAL
    // =====================================================

    const todosTienenPrecio =
        carrito.every(
            producto =>
                Number(
                    producto.precio
                ) > 0
        );


    if (
        todosTienenPrecio
    ) {

        const total =
            carrito.reduce(

                (
                    acumulado,
                    producto
                ) => {

                    const precio =
                        Number(
                            producto.precio
                        ) || 0;


                    const cantidad =
                        Number(
                            producto.cantidad
                        ) || 0;


                    return acumulado +
                        (
                            precio *
                            cantidad
                        );

                },

                0

            );


        mensaje +=
            `Total estimado: $${total.toFixed(2)}\n\n`;

    }


    mensaje +=
        "¿Podrían confirmarme disponibilidad y precio final?";


    return mensaje;

}


// =========================================================
// DETECTAR DISPOSITIVO MÓVIL
// =========================================================

function esDispositivoMovil() {

    return /Android|iPhone|iPad|iPod|Mobile/i
        .test(
            navigator.userAgent
        );

}


// =========================================================
// ENVIAR PEDIDO POR WHATSAPP
// =========================================================

function enviarWhatsApp() {

    const carrito =
        obtenerCarrito();


    if (
        carrito.length === 0
    ) {

        alert(
            "Tu carrito está vacío."
        );


        return;

    }


    const numeroWhatsApp =
        "584228154340";


    const mensaje =
        crearMensajeWhatsApp();


    const mensajeCodificado =
        encodeURIComponent(
            mensaje
        );


    let urlWhatsApp;


    // =====================================================
    // TELÉFONO / TABLET
    // =====================================================

    if (
        esDispositivoMovil()
    ) {

        urlWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    }


    // =====================================================
    // COMPUTADORA
    // =====================================================

    else {

        urlWhatsApp =
            `https://web.whatsapp.com/send/?phone=${numeroWhatsApp}&text=${mensajeCodificado}&type=phone_number&app_absent=1`;

    }


    window.open(
        urlWhatsApp,
        "_blank",
        "noopener,noreferrer"
    );

}


// =========================================================
// BOTÓN ENVIAR PEDIDO
// =========================================================

if (btnWhatsapp) {

    btnWhatsapp.addEventListener(
        "click",
        function () {

            enviarWhatsApp();

        }
    );

}


// =========================================================
// INICIAR
// =========================================================

mostrarCarrito();