import service from "./config.services";

const signupService = (user) => {
  // user => username, password, firstName, lastName
  return service.post("/auth/signup", user);
};

const loginService = (credentials) => {
  //credentials => username, password
  return service.post("/auth/login", credentials);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
