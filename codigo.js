// Base de datos de contenido didáctico para los módulos
const datosModulos = {
    html: {
        titulo: "Módulo 1: HTML5 (El Esqueleto)",
        desc: "Define los elementos estructurales de la web. En el recuadro de al lado puedes ver un elemento tipo '<button>' real renderizado.",
        codigo: '<button id="demo-button">¡Hazme Click!</button>'
    },
    css: {
        titulo: "Módulo 2: CSS3 (El Diseño Visual)",
        desc: "Añade estilos avanzados. Dale click al botón para ver cómo CSS puede alterar dinámicamente los esquemas de color y sombras mediante transiciones.",
        codigo: '.estilo-demo-pro {\n  background: linear-gradient(135deg, #0076ff, #10b981);\n  border-radius: 30px;\n  box-shadow: 0 0 15px rgba(16,185,129,0.4);\n  color: white;\n  font-weight: bold;\n}'
    },
    js: {
        titulo: "Módulo 3: JavaScript (La Interactividad)",
        desc: "¡Prueba dando click real al botón de la derecha! Verás cómo JavaScript intercepta la acción para alterar los textos dinámicamente sin recargar la página.",
        codigo: 'document.getElementById("demo-button").addEventListener("click", () => {\n  document.getElementById("demo-texto").innerText = "¡Interactividad JS activada!";\n});'
    },
    python: {
        titulo: "Módulo 4: Python & Flask (El Backend)",
        desc: "Python gestiona la lógica desde el servidor. En un proyecto completo, cuando el usuario solicita entrar a esta página, Python procesa la ruta '/' mediante Flask y le envía estos archivos limpios al navegador.",
        codigo: 'from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return render_template("index.html")'
    }
};

let moduloActivo = "html";
let clicksJS = 0; // Contador para la pestaña de JS

// MANEJO DE CAMBIO DE PESTAÑAS (TABS)
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        
        moduloActivo = e.target.getAttribute('data-lang');
        
        document.getElementById('titulo-modulo').innerText = datosModulos[moduloActivo].titulo;
        document.getElementById('descripcion-modulo').innerText = datosModulos[moduloActivo].desc;
        document.getElementById('codigo-bloque').innerText = datosModulos[moduloActivo].codigo;

        const botonDemo = document.getElementById('demo-button');
        const textoDemo = document.getElementById('demo-texto');
        
        textoDemo.innerText = "";
        botonDemo.style.transform = "none";
        botonDemo.style.background = "";

        if (moduloActivo !== "html") {
            botonDemo.className = "estilo-demo-pro";
        } else {
            botonDemo.className = "estilo-demo-inicial";
        }
    });
});

// RESPUESTA ESPECÍFICA SEGÚN LA PESTAÑA SELECCIONADA
document.getElementById('demo-button').addEventListener('click', (e) => {
    const textoDemo = document.getElementById('demo-texto');
    const botonDemo = e.target;
    
    if (moduloActivo === "html") {
        textoDemo.innerHTML = `🧱 <strong>[Estructura HTML]</strong> El botón base responde. Sin CSS ni JS, solo soy texto dentro de una caja rígida.`;
    } 
    else if (moduloActivo === "css") {
        const colores = ['#0076ff', '#10b981', '#ff0055', '#7000ff'];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        botonDemo.style.background = colorAleatorio;
        botonDemo.style.transform = "scale(1.1)";
        setTimeout(() => botonDemo.style.transform = "scale(1)", 200);
        
        textoDemo.innerHTML = `🎨 <strong>[Estilo CSS Dinámico]</strong> ¡El botón cambió de color e hizo una transición física sin alterar el HTML!`;
    } 
    else if (moduloActivo === "js") {
        clicksJS++;
        textoDemo.innerHTML = `⚡ <strong>[Lógica JavaScript]</strong> Evento click capturado. Has presionado este botón <strong>${clicksJS} veces</strong> en esta sesión sin recargar el navegador.`;
    } 
    else if (moduloActivo === "python") {
        textoDemo.innerHTML = `🐍 <strong>[Entorno Estático - Demo Python]</strong> JavaScript emuló una petición HTTP de red. Si este proyecto estuviera en un servidor local activo, <code>app.py</code> habría procesado la petición devolviendo un código de estado 200 (OK).`;
    }
});

// --- LÓGICA DE AUDIO LOOP PARA EL VIDEO MATRIX DE HACKEO ---
function iniciarSonidoHacking() {
    const audioHacking = document.getElementById('audio-hacking');
    if (audioHacking) {
        audioHacking.volume = 0.20;
        audioHacking.play().catch(err => {
            console.log("Música de fondo esperando interacción inicial:", err);
        });
    }
}

// --- EFECTO PRO: RECUADROS MATRIX QUE APARECEN Y DESAPARECEN ---
function ejecutarEfectoMatrixGlitch() {
    const videoMatrix = document.getElementById('video-matrix');
    if (!videoMatrix) return;

    setInterval(() => {
        videoMatrix.style.opacity = "0";

        setTimeout(() => {
            const anchoPantalla = window.innerWidth - 350;
            const altoPantalla = window.innerHeight - 250;

            const posX = Math.floor(Math.max(Math.random() * anchoPantalla, 0));
            const posY = Math.floor(Math.max(Math.random() * altoPantalla, 0));

            videoMatrix.style.left = `${posX}px`;
            videoMatrix.style.top = `${posY}px`;

            const opacidadAleatoria = (Math.random() * (0.22 - 0.05) + 0.05).toFixed(2);
            videoMatrix.style.opacity = opacidadAleatoria;

        }, 400);

    }, 2500);
}

// --- DISPARADOR AUTOMÁTICO EN EL PRIMER CLICK EN LA PANTALLA ---
let introEjecutada = false;

document.addEventListener('click', () => {
    if (introEjecutada) return;
    introEjecutada = true;
    
    const overlay = document.getElementById('overlay-intro');
    const video = document.getElementById('video-explicativo');
    
    // Activa y muestra la capa del video al frente
    overlay.classList.add('activo');
    
    // Inicia en silencio controlado exigido por el navegador
    video.muted = true; 
    video.currentTime = 0;
    
    video.play().then(() => {
        // Enciende el sonido 100ms después para evadir el bloqueo
        setTimeout(() => {
            video.muted = false;
            video.volume = 1.0;
        }, 100);
    }).catch(error => {
        console.log("El navegador impidió el arranque:", error);
        video.muted = true;
        video.play();
    });

    video.onended = () => {
        overlay.classList.remove('activo');
        
        setTimeout(() => {
            overlay.style.display = 'none';
            video.src = ""; 
            
            // Activa complementos continuos en loop
            iniciarSonidoHacking();
            ejecutarEfectoMatrixGlitch();
        }, 500);
    };
});
