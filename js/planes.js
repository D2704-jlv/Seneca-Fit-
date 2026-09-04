// =========================================================
// SÉNECA FIT - PLANES
// DATOS PROVISIONALES
// =========================================================

const planes = [

    {
        id: 1,

        nombre:
            "FUERZA",

        etiqueta:
            "OBJETIVO",

        descripcion:
            "Programa orientado al desarrollo de fuerza y progresión en el entrenamiento.",

        beneficios: [
            "Enfoque progresivo",
            "Rutina organizada",
            "Orientado a rendimiento"
        ],

        precio:
            0,

        disponible:
            true
    },


    {
        id: 2,

        nombre:
            "HIPERTROFIA",

        etiqueta:
            "OBJETIVO",

        descripcion:
            "Plan enfocado en el desarrollo muscular y una estructura de entrenamiento progresiva.",

        beneficios: [
            "Desarrollo muscular",
            "Plan estructurado",
            "Progresión de entrenamiento"
        ],

        precio:
            0,

        disponible:
            true
    },


    {
        id: 3,

        nombre:
            "ACONDICIONAMIENTO FISICO",

        etiqueta:
            "OBJETIVO",

        descripcion:
            "Entrenamiento orientado al rendimiento general, condición física y constancia.",

        beneficios: [
            "Condición física",
            "Rendimiento general",
            "Entrenamiento progresivo"
        ],

        precio:
            0,

        disponible:
            true
    }

];



// =========================================================
// ELEMENTOS
// =========================================================

const listaPlanes =
    document.getElementById(
        "lista-planes"
    );



// =========================================================
// RENDERIZAR
// =========================================================

function mostrarPlanes() {


    if (!listaPlanes) {
        return;
    }


    listaPlanes.innerHTML = "";


    planes.forEach(
        plan => {


            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "plan-card";


            const precio =
                plan.precio > 0
                    ? `$${plan.precio.toFixed(2)}`
                    : "Consultar";


            const beneficiosHTML =
                plan.beneficios
                    .map(
                        beneficio => `
                            <li>
                                ${beneficio}
                            </li>
                        `
                    )
                    .join("");


            const mensaje =
                encodeURIComponent(
                    `Hola, Séneca Fit. Quisiera información sobre el plan ${plan.nombre}.`
                );


            tarjeta.innerHTML = `

                <div class="plan-top">

                    <span class="plan-numero">
                        0${plan.id}
                    </span>

                    <span class="plan-estado">
                        DISPONIBLE
                    </span>

                </div>


                <span class="plan-etiqueta">
                    ${plan.etiqueta}
                </span>


                <h3>
                    ${plan.nombre}
                </h3>


                <p class="plan-descripcion">
                    ${plan.descripcion}
                </p>


                <ul class="plan-beneficios">
                    ${beneficiosHTML}
                </ul>


                <div class="plan-footer">

                    <div>

                        <span class="plan-precio-label">
                            INFORMACIÓN
                        </span>

                        <strong class="plan-precio">
                            ${precio}
                        </strong>

                    </div>


                    <a
                        href="https://wa.me/584228154340?text=${mensaje}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="plan-btn"
                    >
                        SOLICITAR →
                    </a>

                </div>

            `;


            listaPlanes.appendChild(
                tarjeta
            );

        }
    );

}



// =========================================================
// INICIAR
// =========================================================

mostrarPlanes();