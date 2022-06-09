import express, { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';

const router: Router = express.Router();
const API_URL = process.env.API_URL || 'http://localhost:1337';

interface ResData {
  jwt: string;
  user: Record<string, unknown>;
}

router.post('/local', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRes = await axios.post(`${API_URL}/auth/local`, req.body);
    const { jwt, user }: ResData = loginRes.data;
    // @ts-ignore
    req.session.jwt = jwt;
    const data = { user };
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/local/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signupRes = await axios.post(`${API_URL}/auth/local/register`, req.body);
    const { jwt, user }: ResData = signupRes.data;
    // @ts-ignore
    req.session.jwt = jwt;
    const data = { user };
    res.send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
