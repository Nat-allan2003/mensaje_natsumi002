const chatWindow = document.querySelector('.chat-window');
const finishBtn = document.getElementById('finishBtn');
const avatarSrc = "imagenes/avatar1.png"; // Avatar de Paula

// Mensajes del chat
const messages = [
    { text: "Hola… se que quizas no es el momento oportuno", type: "sent" },
    { text: "no hace falta que me respondas al Whatshapp despues de ver esto, ignoralo", type: "sent" },
    { text: "Pero tengo la costumbre de siempre darte algo, ya sea fisico o tecnologico", type: "sent" },
    { text: "Es gracioso porque lo que se, lo uso para hacerte maravillas.", type: "sent" },
    { text: "Hemos pasado por tanto pauli, lamento mucho en como quedamos", type: "sent" },
    { type: "image", src: "imagenes/meme1.png" }, 
    { text: "Quisiera poder retroceder el tiempo para poder ser una mejor persona para ti", type: "sent"},   
    { text: "Es septiembre, septiembre de flores amarillas...", type: "sent" },
    { type: "image", src: "imagenes/flores.png" }, 
    { text: "Estas son para ti... I'm sorry", type: "sent" },
    { text: "Espero que este programa te haga sonreír.", type: "sent" },
    { text: "No es mucho, pero es un pedacito de mí que quería compartir contigo.", type: "sent" },
    { text: "Este es un programa con mi mensaje, no puedes hacer nada solo leerlo y esperar", type: "sent" },
    { text: "Al finalizar se cerrará la pagina y te dará error, esta programado así", type: "sent" },
    { text: "Perdon por darte este tipo de detalles, es lo que al menos se me ocurre ", type: "sent" },
    { text: "Quisiera agradecerte todo los bonitos momentos, las risas, la felicidad que pude sentir, lamento si no fui la persona que esperabas que sea, me gusta verte sonreir, cumplir tus sueños, estar presente en cada uno de tus logros, hacerte compañia y escucharte, eres lo mejor que me pude haber pasado :c ", type: "sent" },
    { type: "image", src: "imagenes/paula1.png" }, 
    { text: "Como siempre te diré: Estoy para ayudar :D", type: "sent" },
    { text: "Paula Narvaez, ha pesar de la distancia y el tiempo, siempre te querré asi sea desde las sombras", type: "sent" },
    { text: "Eres la mejor abogada que puede existir, puedes alcanzar tus metas si te los propones, eres fuerte... no lo olvides", type: "sent" },
    { text: "OE VISAJE!! EL VERDE ESTA CARO!!!", type: "sent" },
    { text: "JAJAJA", type: "sent" },
    { text: ":b", type: "sent" }, 
    { text: "Las noches ya no son igual sin tu presencia", type: "sent" },
    { text: "Nunca lo olvides, lo que es mio es tuyo.... TKM", type: "sent" },
    { text: "Siempre te voy a querer tal y como eres, asi con todos tus problemas y defectos, eres mi guapa 7u7 eres alguien importante para mi, no tengo la valentia en decirtelo face to face pero lo transmito por aqui, jaja mi creatividad es grande", type: "sent" },
    { type: "image", src: "imagenes/paula2.png" }, 
    { text: "Ahora te toca a ti guardar estas palabras en un rincón de tu corazón.", type: "sent" },
    { text: " - Con cariño y sinceridad, Fernando -", type: "sent" },
    { text: "Por cierto, este programa se cerrará en 10seg, Que pases bonita noche, tarde o dia", type: "sent" },
];

// Función de tipeo
function typeMessage(msgObj, callback) {
    const msgEl = document.createElement('div');
    msgEl.classList.add('message', 'sent');

    const avatar = document.createElement('img');
    avatar.src = avatarSrc;
    avatar.classList.add('avatar');
    msgEl.appendChild(avatar);

    if(msgObj.type === "sent") {
        const textEl = document.createElement('span');
        msgEl.appendChild(textEl);
        chatWindow.appendChild(msgEl);

        let i = 0;
        function typeChar() {
            if (i < msgObj.text.length) {
                textEl.textContent += msgObj.text.charAt(i);
                i++;
                chatWindow.scrollTop = chatWindow.scrollHeight;
                setTimeout(typeChar, 50);
            } else {
                if(callback) callback();
            }
        }
        typeChar();
    } else if(msgObj.type === "image") {
        const img = document.createElement('img');
        img.src = msgObj.src;
        img.style.width = "100%";
        img.style.maxHeight = "250px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "10px";
        img.style.cursor = "pointer";
        msgEl.appendChild(img);
        chatWindow.appendChild(msgEl);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.style.position = "fixed";
            lightbox.style.top = 0;
            lightbox.style.left = 0;
            lightbox.style.width = "100%";
            lightbox.style.height = "100%";
            lightbox.style.background = "rgba(0,0,0,0.9)";
            lightbox.style.display = "flex";
            lightbox.style.alignItems = "center";
            lightbox.style.justifyContent = "center";
            lightbox.style.cursor = "pointer";
            const fullImg = document.createElement('img');
            fullImg.src = msgObj.src;
            fullImg.style.maxWidth = "90%";
            fullImg.style.maxHeight = "90%";
            fullImg.style.borderRadius = "10px";
            lightbox.appendChild(fullImg);
            lightbox.addEventListener('click', () => lightbox.remove());
            document.body.appendChild(lightbox);
        });

        const continueBtn = document.createElement('button');
        continueBtn.textContent = "Continuar";
        continueBtn.classList.add('continue-button');
        chatWindow.appendChild(continueBtn);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        continueBtn.addEventListener('click', () => {
            continueBtn.remove();
            if(callback) callback();
        });
    }
}

// Función de “autodestrucción”
function autoDestroy() {
    document.body.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; height:100vh; background:red; color:white; font-size:2rem; text-align:center;">
            ERROR FATAL: MENSAJE AUTODESTRUIDO
        </div>
    `;
}

// Mostrar todos los mensajes
function showMessages(index = 0) {
    if(index >= messages.length) {
        finishBtn.disabled = false;
        finishBtn.style.opacity = 0;
        finishBtn.style.transition = "opacity 1s ease-in-out";
        setTimeout(() => { finishBtn.style.opacity = 1; }, 100);

        // Timeout 10 segundos para auto-destrucción
        setTimeout(() => autoDestroy(), 10000);
        return;
    }
    typeMessage(messages[index], () => showMessages(index + 1));
}

// Burbujas de fondo
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 15 + 5;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * window.innerWidth + "px";
    bubble.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 10000);
}

setInterval(createBubble, 800);

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    finishBtn.disabled = true;
    finishBtn.style.opacity = 0;
    showMessages(0);

    finishBtn.addEventListener('click', () => autoDestroy());
});