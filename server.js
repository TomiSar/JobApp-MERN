import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
const port = 5100 || process.env.PORT;
import connectDB from './config/db.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

// routers
import jobRouter from './routes/jobRouter.js';

// Connect to DB
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.toUpperCase().rainbow);
});
