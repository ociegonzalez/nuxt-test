export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {
    try {

      await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      await fetch();

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
    await clear();
    navigateTo("/?message=Logout Successful");
  };

  return {
    loggedIn,
    session,
    user,

    //getters
    isLoggedIn: loggedIn,
    isAdmin: computed(() => user.value?.roles.includes('admin')),

    //actions
    fetch,
    login,
    logout,
    regiister,
  };
};
