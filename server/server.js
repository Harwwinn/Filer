const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mjml = require('mjml');
require('dotenv').config();  // Para cargar variables de entorno

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(cors());
app.use(bodyParser.json());

app.post('/send-quote', async (req, res) => {
    const { name, email, phone, company, productos } = req.body;

    const itemList = productos.map(item => `
      <tr>
          <td>${item.filtro}</td>
          <td>${item.material}</td>
          <td>${item.nomDeep} / ${item.realDeep}</td>
          <td>${item.nomSize} / ${item.realSize}</td>
          <td>${item.cantidad}</td>
      </tr>
    `).join('');
    
    const mjmlTemplate = `
      <mjml>
        <mj-head>
          <mj-preview>Solicitud de Cotización</mj-preview>
          <mj-style inline="inline">
            @media only screen and (max-width:480px) {
              table, thead, tbody, th, td, tr {
                display: block !important;
                width: 100% !important;
              }
              tr {
                margin-bottom: 15px;
                border-bottom: 1px solid #ddd;
              }
              td {
                text-align: left !important;
                padding: 10px 5px !important;
                font-size: 13px !important;
              }
              th {
                display: none !important;
              }
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: center;
              font-size: 14px;
            }
            th {
              background-color: #f8f8f8;
            }
          </mj-style>
        </mj-head>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-text font-size="20px" font-weight="bold">Solicitud de Cotización</mj-text>
              <mj-text><strong>Razón Social:</strong> ${company}</mj-text>
              <mj-text><strong>Nombre:</strong> ${name}</mj-text>
              <mj-text><strong>Correo:</strong> ${email}</mj-text>
              <mj-text><strong>Teléfono:</strong> ${phone}</mj-text>
              <mj-text font-size="18px" font-weight="bold">Productos seleccionados:</mj-text>
              <mj-raw>
                <table>
                  <thead>
                    <tr>
                      <th>Filtro</th>
                      <th>Material</th>
                      <th>Profundidad Nom/Real</th>
                      <th>Tamaño Nom/Real</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemList}
                  </tbody>
                </table>
              </mj-raw>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `;
    
    const htmlMessage = mjml(mjmlTemplate).html;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS  
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'edgar.rosas@filer.com.mx',
        subject: 'Nueva solicitud de cotización',
        html: htmlMessage
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
        res.status(200).json({ message: 'Cotización enviada con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

// 🔹 En lugar de `app.listen`, exportamos `app` para Vercel
module.exports = app;
