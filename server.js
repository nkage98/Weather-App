import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import './src/db.js'; 
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

import routes from './src/routes/routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const csrfProtection = csrf({ cookie: true });
//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'middlewares')));

app.use(csrfProtection);

// routes
app.use('/', routes);

console.log('Conectado ao MySQL');

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});