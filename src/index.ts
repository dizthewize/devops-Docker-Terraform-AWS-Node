/* eslint-disable prefer-destructuring */
import 'dotenv/config';
import { log } from './utils/logger';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'cookie-session';
import authRoutes from './routes/auth';
import userRoute from './routes/user';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();

const port: string | number = process.env.PORT || process.env.API_NODE_PORT || 4000;

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ name: 'jwt', keys: ['abc'] }));

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoute);

app.get(`/*`, (req: Request, res: Response) =>
  res.json({
    message: `Welcome to api`,
  }),
);

/* 404 Not Found middleware */
app.use(notFound);

/* Error handling middleware
  helps pinpoint which route is having error
  if route is 500, error is regarding different route
*/
app.use(errorHandler);

app.listen(port, () => {
  log.info(`hosting @${port}`);
});
