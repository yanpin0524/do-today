import axios from "axios";

export default {
  state: {
    userId: null,
    token: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async signup(context, payload) {
      const mode = payload.mode;
      const aipKey = import.meta.env.VITE_FIREBASE_WEB_API_KEY;
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${aipKey}`;

      try {
        const res = await axios.post(authUrl, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("token", res.data.idToken);

        context.commit("setUserId", res.data.localId);
        context.commit("setToken", res.data.idToken);
      } catch (err) {
        throw new Error(err.response.data.error.message || `Failed to signup`);
      }
    },
    async login(context, payload) {
      const aipKey = import.meta.env.VITE_FIREBASE_WEB_API_KEY;
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${aipKey}`;

      try {
        const res = await axios.post(authUrl, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("token", res.data.idToken);

        context.commit("setUserId", res.data.localId);
        context.commit("setToken", res.data.idToken);
      } catch (err) {
        throw new Error(err.response.data.error.message || `Failed to login`);
      }
    },
    autoLogin(context) {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        return;
      }
      context.commit("setUserId", userId);
      context.commit("setToken", token);
    },
    logout(context) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      context.commit("setUserId", null);
      context.commit("setToken", null);

      context.commit("fetchTodos");
    },
  },
};
