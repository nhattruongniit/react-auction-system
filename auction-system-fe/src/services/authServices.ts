class AuthService {
  setSession = (accessToken: string, key: string = "accessToken") => {
    window.sessionStorage.setItem(key, accessToken);
  };

  logOut = () => {
    window.sessionStorage.clear();
  };

  getAccessToken = () => window.sessionStorage.getItem("accessToken");

  isAuthenticated = () => !!this.getAccessToken();
}

const authService = new AuthService();

export default authService;
