import appRoutes from "../lib/constants";
import { useRouter } from 'next/router';

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ children, router }) => {

  //Identify authenticated user
  const isAuthenticated = true;
  const Router = useRouter();

  let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    appRoutes.FORGOT_PASSWORD,
    appRoutes.RESET_PASSWORD,
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    Router.push(appRoutes.LOGIN_PAGE)
  }

  return children;
};

export default ProtectedRoute;
