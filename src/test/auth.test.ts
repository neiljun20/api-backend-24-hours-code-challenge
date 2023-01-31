import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import supertest from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.routes';
import { SignUpUserInput } from '../schemas/auth.schema';

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: SignUpUserInput = {
        email: 'test@email.com',
        password: 'Qq1w2e3r4!',
        passwordConfirmation: 'Qq1w2e3r4!'
      };

      const app = new App();
      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();

      const { statusCode, body } = await supertest(app.build()).post('/signup').send(userData);
      expect(statusCode).toBe(201);
    });
  });
});
