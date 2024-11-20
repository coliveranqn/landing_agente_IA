// chatbot.js
const WebSocket = require('ws');


// Elige un puerto específico para el chatbot
const CHATBOT_PORT = 3002;

// Crea el servidor WebSocket
const wss = new WebSocket.Server({ port: CHATBOT_PORT }, () => {
    console.log(`Chatbot service running on ws://localhost:${CHATBOT_PORT}`);
});

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado al chatbot');

    // Respuesta de bienvenida al cliente
    ws.send('¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?');

    // Escucha los mensajes entrantes desde el cliente
    ws.on('message', (data) => {
        console.log(`Mensaje recibido del cliente: ${data}`);
        let input = data.toString();       
//        const mensaje = JSON.parse(input.data) ;
        console.log("input:",input);
//        return;
        sendMessage();

        async function sendMessage() {


//            if (!data) return;
    
            //displayMessage(message, 'user-message');
    
            const response = await fetch('http://localhost:3005/api/consulta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
//            console.log(response.json());
            const data = await response.json();
            //displayMessage(data.reply, 'assistant-message');
    
            input.value = '';
            ws.send(data.reply);
            console.log(data.reply);
        }
    
        /*function displayMessage(message, className) {
            const messageBox = document.createElement("div");
            messageBox.classList.add("message", className);
            messageBox.textContent = message;
            document.getElementById("messages").appendChild(messageBox);
        }


         Lógica de respuesta del chatbot
        let response;
        if (message.includes('precio')) {
            response = 'Puedes encontrar todos nuestros precios en la sección de productos.';
        } else if (message.includes('ayuda')) {
            response = 'Claro, ¿en qué área necesitas ayuda?';
        } else {
            response = 'Lo siento, no entendí tu consulta. ¿Podrías reformularla?';
        }

        // Envía la respuesta al cliente  */
        
    });

    // Maneja la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado del chatbot');
    });
});

module.exports = wss;
