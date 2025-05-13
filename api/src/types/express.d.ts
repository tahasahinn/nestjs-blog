import { User } from '../user/schemas/user.schemas';

declare global {
  namespace Express {
    interface User {
      _id: string;
      username: string;
      email: string;
      profilePicture: string;
    }
  }
  interface Request {
    cookies: {
      access_token: string;
      refresh_token: string;
    };
  }
}
