import { useCookies } from "react-cookie";

const TOKEN_NAME = "schedulerToken";

export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

  const setAuthToken = (authToken: string) => setCookie(TOKEN_NAME, authToken);

  const removeAuthToken = () => removeCookie(TOKEN_NAME);

  return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};
