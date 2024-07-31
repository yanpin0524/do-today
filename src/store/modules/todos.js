import axios from "axios";

export default {
  state: {
    databaseUrl: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    todos: [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
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
    cleanCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
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
        throw new Error(err);
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
        throw new Error(err);
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
          throw new Error(err);
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
        } catch (error) {
          throw new Error(error);
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
          throw new Error(err);
        }
      }
    },
  },
};
