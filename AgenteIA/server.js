import express  from 'express';
import axios  from 'axios';
import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();
const port = 3005;

app.use(bodyParser.json());
//app.use(express.static('front')); // Asegúrate de que la carpeta 'public' contenga el HTML

// Ruta para procesar la consulta del asistente virtual
app.post('/api/consulta', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Llamada al agente que se conecta a la API de OpenAI
        const reply = await enviarConsultaAgente(userMessage);
        res.json({ reply: reply });
    } catch (error) {
        console.error('Error al consultar al agente:', error);
        res.status(500).json({ reply: 'Lo siento, hubo un error en el agente.' });
    }
});

// Función para enviar la consulta al agente y luego a la API de OpenAI
async function enviarConsultaAgente(mensaje) {
    //const apiKey = process.env.OPENAI_API_KEY;
    const apiKey = process.env.MISTRAL_API_KEY;

   // const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
    
        //model: 'gpt-3.5-turbo', // Puedes cambiar el modelo si es necesario
        model: 'codestral-latest',
        messages: [{ role: 'user', content: mensaje }]
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    const respuestaAgente = response.data.choices[0].message.content;
    return respuestaAgente;
}

app.listen(port, () => {
    console.log( "openai_api_key", process.env.OPENAI_API_KEY)
    console.log( "mistral_api_key", process.env.MISTRAL_API_KEY)
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
