import axios from "axios";

export default {
  state: {
    databaseUrl: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    onlyUncompleted: false,
  },
  getters: {
    getTodos(state) {
      if (state.onlyUncompleted) {
        return state.todos.filter((todo) => !todo.completed);
      }
      return state.todos;
    },
    getHideCompletedState(state) {
      return state.onlyUncompleted ? "show" : "hide";
    },
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        priority: todo.priority,
      });
    },
    setTodo(state, newTodoContent) {
      const todo = state.todos.find((todo) => todo.id === newTodoContent.id);

      todo.title = newTodoContent.title;
      todo.priority = newTodoContent.priority;
    },
    setTodoCompleted(state, newTodoContent) {
      const { id, completed } = newTodoContent;
      const todo = state.todos.find((todo) => todo.id === id);

      todo.completed = completed;
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    toggleOnlyUncompleted(state) {
      state.onlyUncompleted = !state.onlyUncompleted;
    },
  },
  actions: {
    async fetchTodos(context) {
      const token = context.getters.getToken;
      const userId = context.getters.getUserId;

      if (!token || !userId) {
        context.commit("setTodos", []);
        return;
      }

      try {
        const res = await axios.get(
          context.state.databaseUrl + `/todos/${userId}.json?auth=${token}`
        );

        const todos = [];
        for (const key in res.data) {
          todos.push({
            id: key,
            title: res.data[key].title,
            completed: res.data[key].completed,
            priority: res.data[key].priority,
          });
        }

        context.commit("setTodos", todos);
      } catch (err) {
        const statusCode = err.toJSON().status;
        throw new Error(err, { cause: statusCode });
      }
    },
    async addTodo(context, todo) {
      const token = context.getters.getToken;
      const userId = context.getters.getUserId;

      if (!token || !userId) {
        context.commit("addTodo", {
          id: new Date().getTime().toString(),
          ...todo,
        });
        return;
      }

      try {
        const res = await axios.post(
          context.state.databaseUrl + `/todos/${userId}.json?auth=${token}`,
          {
            title: todo.title,
            completed: false,
            priority: todo.priority,
          }
        );

        context.commit("addTodo", {
          id: res.data.name,
          ...todo,
        });
      } catch (err) {
        const statusCode = err.toJSON().status;
        throw new Error(err, { cause: statusCode });
      }
    },
    async updateTodo(context, newTodoContent) {
      context.commit("setTodo", newTodoContent);

      const token = context.getters.getToken;
      const userId = context.getters.getUserId;

      if (token && userId) {
        const { id, title, priority } = newTodoContent;
        const url =
          context.state.databaseUrl +
          `/todos/${userId}/${id}.json?auth=${token}`;

        try {
          await axios.patch(url, {
            title,
            priority,
          });
        } catch (err) {
          const statusCode = err.toJSON().status;
          throw new Error(err, { cause: statusCode });
        }
      }
    },
    async updateTodoCompleted(context, newTodoContent) {
      context.commit("setTodoCompleted", newTodoContent);

      const token = context.getters.getToken;
      const userId = context.getters.getUserId;

      if (token && userId) {
        const { id, completed } = newTodoContent;
        const url =
          context.state.databaseUrl +
          `/todos/${userId}/${id}.json?auth=${token}`;

        try {
          await axios.patch(url, { completed });
        } catch (err) {
          const statusCode = err.toJSON().status;
          throw new Error(err, { cause: statusCode });
        }
      }
    },
    async deleteTodo(context, id) {
      context.commit("deleteTodo", id);

      const token = context.getters.getToken;
      const userId = context.getters.getUserId;

      if (token && userId) {
        const url =
          context.state.databaseUrl +
          `/todos/${userId}/${id}.json?auth=${token}`;

        try {
          await axios.delete(url);
        } catch (err) {
          const statusCode = err.toJSON().status;
          throw new Error(err, { cause: statusCode });
        }
      }
    },
  },
};
