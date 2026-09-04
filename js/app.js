// =========================================================
// SÉNECA FIT
// APP GENERAL
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =================================================
        // CONFIGURACIÓN WHATSAPP
        // =================================================

        const NUMERO_WHATSAPP =
            "584228154340";



        // =================================================
        // FUNCIÓN GENERAL PARA ABRIR WHATSAPP
        // =================================================

        function abrirWhatsApp(
            mensaje = ""
        ) {


            const texto =
                encodeURIComponent(
                    mensaje
                );


            const esMovil =
                /Android|iPhone|iPad|iPod|Mobile/i
                    .test(
                        navigator.userAgent
                    );


            let url;



            // =============================================
            // CELULAR
            // =============================================

            if (esMovil) {

                url =
                    `https://wa.me/${NUMERO_WHATSAPP}?text=${texto}`;

            }


            // =============================================
            // COMPUTADORA
            // =============================================

            else {

                url =
                    `https://web.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${texto}`;

            }



            window.open(
                url,
                "_blank"
            );

        }



        // =================================================
        // MENÚ MÓVIL
        // =================================================

        const menuToggle =
            document.getElementById(
                "menu-toggle"
            );


        const menuPrincipal =
            document.getElementById(
                "menu-principal"
            );



        if (
            menuToggle &&
            menuPrincipal
        ) {


            menuToggle.addEventListener(
                "click",
                function () {


                    const abierto =
                        menuPrincipal
                            .classList
                            .toggle(
                                "menu-abierto"
                            );


                    menuToggle
                        .classList
                        .toggle(
                            "activo"
                        );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        abierto
                            ? "true"
                            : "false"
                    );

                }
            );



            const enlacesMenu =
                menuPrincipal
                    .querySelectorAll(
                        "a"
                    );


            enlacesMenu.forEach(
                function (enlace) {


                    enlace.addEventListener(
                        "click",
                        function () {


                            menuPrincipal
                                .classList
                                .remove(
                                    "menu-abierto"
                                );


                            menuToggle
                                .classList
                                .remove(
                                    "activo"
                                );


                            menuToggle
                                .setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                        }
                    );

                }
            );

        }



        // =================================================
        // CONTADORES DEL CARRITO
        // =================================================

        actualizarContadoresCarrito();



        // =================================================
        // BOTONES DIRECTOS DE WHATSAPP
        // =================================================

        const botonesWhatsApp =
            document.querySelectorAll(
                ".whatsapp-directo"
            );



        botonesWhatsApp.forEach(
            function (boton) {


                boton.addEventListener(
                    "click",
                    function () {


                        const mensaje =
                            boton.dataset.mensaje
                            ||
                            "Hola, Séneca Fit. Quisiera realizar una consulta.";


                        abrirWhatsApp(
                            mensaje
                        );

                    }
                );

            }
        );



        // =================================================
        // WIDGET FLOTANTE
        // =================================================

        const whatsappFloat =
            document.getElementById(
                "whatsapp-float"
            );


        const whatsappChat =
            document.getElementById(
                "whatsapp-chat"
            );


        const whatsappCerrar =
            document.getElementById(
                "wa-cerrar"
            );


        const whatsappTexto =
            document.getElementById(
                "wa-texto"
            );


        const whatsappEnviar =
            document.getElementById(
                "wa-enviar"
            );



        // =============================================
        // ABRIR / CERRAR CHAT
        // =============================================

        if (
            whatsappFloat &&
            whatsappChat
        ) {


            whatsappFloat.addEventListener(
                "click",
                function () {


                    whatsappChat
                        .classList
                        .toggle(
                            "activo"
                        );

                }
            );

        }



        if (
            whatsappCerrar &&
            whatsappChat
        ) {


            whatsappCerrar.addEventListener(
                "click",
                function () {


                    whatsappChat
                        .classList
                        .remove(
                            "activo"
                        );

                }
            );

        }



        // =================================================
        // ENVIAR MENSAJE DESDE EL WIDGET
        // =================================================

        function enviarMensajeWidget() {


            if (!whatsappTexto) {
                return;
            }


            const mensaje =
                whatsappTexto
                    .value
                    .trim();



            if (!mensaje) {


                whatsappTexto.focus();

                return;

            }



            abrirWhatsApp(
                mensaje
            );

        }



        if (whatsappEnviar) {


            whatsappEnviar.addEventListener(
                "click",
                enviarMensajeWidget
            );

        }



        // =================================================
        // ENTER = ENVIAR
        // SHIFT + ENTER = SALTO DE LÍNEA
        // =================================================

        if (whatsappTexto) {


            whatsappTexto.addEventListener(
                "keydown",
                function (event) {


                    if (
                        event.key === "Enter" &&
                        !event.shiftKey
                    ) {


                        event.preventDefault();


                        enviarMensajeWidget();

                    }

                }
            );

        }

    }
);



// =========================================================
// ACTUALIZAR CONTADORES DEL CARRITO
// =========================================================

function actualizarContadoresCarrito() {


    let carrito = [];


    try {


        carrito =
            JSON.parse(
                localStorage.getItem(
                    "carrito"
                )
            ) || [];

    }


    catch (error) {


        carrito = [];

    }



    const totalProductos =
        carrito.reduce(

            function (
                total,
                producto
            ) {


                return total +
                    (
                        Number(
                            producto.cantidad
                        ) || 0
                    );

            },

            0

        );



    // DESKTOP

    const contadorDesktop =
        document.getElementById(
            "contador-carrito"
        );


    if (contadorDesktop) {


        contadorDesktop.textContent =
            totalProductos;

    }



    // MÓVIL

    const contadorMobile =
        document.getElementById(
            "contador-carrito-mobile"
        );


    if (contadorMobile) {


        contadorMobile.textContent =
            totalProductos;

    }

}