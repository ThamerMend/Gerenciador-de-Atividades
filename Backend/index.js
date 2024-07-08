const express = require('express');
const status = require('http-status');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const cors = require('cors');
const helmet = require('helmet');

const category = require('./src/routes/category');
const activity = require('./src/routes/activity');
const user = require('./src/routes/user');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/category', category);
app.use('/activity', activity);
app.use('/user', user);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));


app.get('/', (req, res) => {
  res.status(status.OK).send('API is running!');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
  console.log(`Documentação Swagger na porta http://localhost:${PORT}/api-docs`);
});
