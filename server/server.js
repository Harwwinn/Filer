require('dotenv').config();  // Cargar las variables de entorno
const express = require('express');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); // Esto permitirá solicitudes de cualquier origen

// Verificar si la variable de entorno está cargada correctamente
console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY);  // Esto debería mostrar la clave de API en la consola

// Configurar la clave de API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Ruta para enviar el correo
app.post('/send-quote', (req, res) => {
  const { items, email, name, phone, company } = req.body;

  if (!items || !email || !name || !phone || !company) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const message = {
    to: process.env.DESTINATION_EMAIL,  // Dirección de correo de destino
    from: email,  // El correo del remitente (el correo que se recibe desde el formulario)
    subject: 'Nueva solicitud de cotización',
    text: `
      Nombre: ${name}
      Correo: ${email}
      Teléfono: ${phone}
      Razón Social: ${company}
      Productos: ${items.map(item => `${item.name} - Cantidad: ${item.quantity}`).join('\n')}
    `,
    html: `
      <h2>Solicitud de Cotización</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Razón Social:</strong> ${company}</p>
      <h3>Productos:</h3>
      <ul>
        ${items.map(item => `<li>${item.name} - Cantidad: ${item.quantity}</li>`).join('')}
      </ul>
    `,
  };

  // Enviar el correo
  sgMail
    .send(message)
    .then(() => {
      res.json({ message: 'Cotización enviada con éxito' });
    })
    .catch((error) => {
        setMessage('Error al enviar el formulario. Intenta nuevamente.');
        console.error('Error al enviar el formulario:', error);
        if (error.response) {
            console.error('Response error:', error.response);
        }
        if (error.request) {
            console.error('Request error:', error.request);
        }
    });
    
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
