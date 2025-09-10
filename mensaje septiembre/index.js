// Efectos adicionales con JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Crear efectos de interferencia aleatorios
    setInterval(() => {
        const random = Math.random();
        if (random > 0.7) {
            createInterference();
        }
    }, 3000);

    // Función para crear interferencia aleatoria
    function createInterference() {
        const interference = document.createElement('div');
        interference.style.position = 'absolute';
        interference.style.top = Math.random() * 100 + '%';
        interference.style.left = Math.random() * 100 + '%';
        interference.style.width = Math.random() * 300 + 'px';
        interference.style.height = Math.random() * 3 + 'px';
        interference.style.background = 'linear-gradient(to right, #00ffff, #ff00ff)';
        interference.style.opacity = '0';
        interference.style.boxShadow = '0 0 10px 2px rgba(0, 255, 255, 0.7)';
        interference.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        interference.style.zIndex = '1';
        interference.style.pointerEvents = 'none';

        document.body.appendChild(interference);

        // Animación de la interferencia
        const keyframes = [
            { opacity: 0, width: '0px' },
            { opacity: 0.8, width: interference.style.width },
            { opacity: 0, width: '0px' }
        ];

        const timing = {
            duration: 500,
            iterations: 1
        };

        interference.animate(keyframes, timing).onfinish = function() {
            document.body.removeChild(interference);
        };
    }

    // Efecto de parpadeo en el texto
    const glitchText = document.querySelector('.glitch-text');
    setInterval(() => {
        if (Math.random() > 0.7) {
            glitchText.style.opacity = '0.5';
            setTimeout(() => {
                glitchText.style.opacity = '1';
            }, 100);
        }
    }, 2000);

    // Funcionalidad de la modal
    const modal = document.getElementById('cyberModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');

    openBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // -----------------------------
    // ANIMACIÓN DE TIPEO EN LA CONSOLA
    // -----------------------------
    const continueBtn = document.querySelector('.submit-button');
    const consoleText = document.querySelector('.console-text');

    const messages = [
        { text: "Cargando....", delay: 100 }, 
        { text: "Mensaje mientras se carga", delay: 100 }, 
        { text: "Espero que te guste el obsequio", delay: 100 }, 
        { text: "No hace falta que respondas, lo hago porque quiero", delay: 50 }, 
        { text: "No es mucho pero es trabajo honesto", delay: 50 }, 
        { text: "Carga completa, accediendo al mensaje", delay: 50 }
    ];

    function typeMessage(element, messages, index = 0, callback) {
        if (index >= messages.length) {
            // Todos los mensajes escritos, espera 6 segundos y llama callback
            setTimeout(callback, 1000);
            return;
        }

        const message = messages[index];
        let i = 0;

        function typeChar() {
            if (i < message.text.length) {
                element.innerHTML += message.text.charAt(i);
                i++;
                setTimeout(typeChar, message.delay);
            } else {
                // Al finalizar la línea, agrega un salto de línea con cursor
                element.innerHTML += "<br>> _<br>";
                setTimeout(() => {
                    typeMessage(element, messages, index + 1, callback);
                }, 500); // espera medio segundo antes de la siguiente línea
            }
        }

        typeChar();
    }

continueBtn.addEventListener('click', function(e) {
    e.preventDefault(); // evita redirección inmediata

    // BLOQUEAR el botón para que no se pueda clickear mientras escribe
    continueBtn.disabled = true;
    continueBtn.style.cursor = 'not-allowed';
    continueBtn.style.opacity = '0.3';

    consoleText.innerHTML = "> _<br>"; // limpia y prepara el cursor
    typeMessage(consoleText, messages, 0, function() {
        // Redirige a mensaje.html después de 6 segundos del último mensaje
        window.location.href = "mensaje.html";
    });
});
});