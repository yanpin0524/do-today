import { createStore } from "vuex";

import todos from "./modules/todos.js";
import auth from "./modules/auth.js";

export default createStore({
  modules: {
    todos,
    auth,
  },
});
