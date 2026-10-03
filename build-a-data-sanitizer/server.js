import express from 'express';
import {inputCleaner, inputValidator} from './middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();

apiRouter.use(inputCleaner);
apiRouter.use(inputValidator);


apiRouter.post('/', (req, res) => {
  console.log(req.body);
  res.send(`<h1>Login successful! ${req.body.username.toLowerCase() } ${req.body.comment}</h1>`);
});

app.use('/submit', apiRouter);

app.get('/', (req, res) => {
  res.redirect('/form')
})

app.use('/form', express.static('public'))

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})