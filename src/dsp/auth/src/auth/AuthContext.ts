import { createContext } from "react";
import { ApiRequest } from "./AuthHook";
import { User, ANONYMOUS_USER, ANONYMOUS_TOKEN } from "../model/AuthModel";

interface IAuthContext {
  user: User | null;
  token: string;
  setAuthStatus: (user: User, token: string) => void;
  setUnauthStatus: () => void;
  apiRequest: (req: ApiRequest) => Promise<any>;
}

export const authContext = createContext<IAuthContext>({
  user: ANONYMOUS_USER,
  token: ANONYMOUS_TOKEN,
  setAuthStatus: (user: User, token: string) => {},
  setUnauthStatus: () => {},
  apiRequest: (req: ApiRequest) => Promise.resolve({}),
});

export default authContext;
