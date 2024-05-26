import { globalErrorhandler } from './app/middlewares/globlaErrorHandlers';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { notFound } from './app/middlewares/notFount';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const helloMessage = (req: Request, res: Response) => {
  const msg = 'Hello world!';
  res.send(msg);
};

app.get('/', helloMessage);
app.use(notFound);

// globalErrorHandler
app.use(globalErrorhandler);
export default app;
