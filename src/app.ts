import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

// console.log(app.get('env'))

// for testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'ore baba re')
//   // Promise.reject(new Error('unhandle promise'))
//   // console.log(x)
//   // throw new Error('testing error')
//   // next('ore baba error')
// });

// global error handler
app.use(globalErrorHandler);

export default app;
