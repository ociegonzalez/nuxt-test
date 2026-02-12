export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {
    try {
      console.log("Before loginn:", loggedIn.value);
      await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      await fetch();
      console.log("After loginn:", loggedIn.value);

      navigateTo("/?message=Login Successful");

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const regiister = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: { fullName, email, password },
      });

      navigateTo("/?message=Login Successful");

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = async () => {
    console.log("Before clear - loggedIn:", loggedIn.value);
    await clear();
    console.log("After clear - loggedIn:", loggedIn.value);
    console.log("Salir");
    navigateTo("/?message=Logout Successful");
  };

  return {
    loggedIn,
    session,
    user,

    //getters
    isLoggedIn: loggedIn,

    //actions
    fetch,
    login,
    logout,
    regiister,
  };
};
