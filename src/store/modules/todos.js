export default {
  state: {
    todos: [
      { id: "abc123", title: "Learn Vue", completed: false, priority: 3 },
      { id: "def456", title: "Write Blog Post", completed: false, priority: 2 },
      { id: "ghi789", title: "Buy Groceries", completed: true, priority: 1 },
      { id: "jkl012", title: "Clean the House", completed: false, priority: 0 },
      {
        id: "mno345",
        title: "Finish Project Report",
        completed: true,
        priority: 3,
      },
      {
        id: "pqr678",
        title: "Schedule Doctor Appointment",
        completed: false,
        priority: 2,
      },
      { id: "stu901", title: "Read a Book", completed: false, priority: 1 },
      { id: "vwx234", title: "Exercise", completed: true, priority: 2 },
      {
        id: "yzb567",
        title: "Plan Weekend Trip",
        completed: false,
        priority: 3,
      },
      {
        id: "cde890",
        title: "Organize Workspace",
        completed: false,
        priority: 1,
      },
    ],
  },
  getters: {
    getTodos: (state) => {
      return state.todos;
    },
  },
  mutations: {
    addTodo: (state, todo) => {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        priority: todo.priority,
      });
    },
    setTodo: (state, newTodo) => {
      const todo = state.todos.find((todo) => todo.id === newTodo.id);

      todo.title = newTodo.title;
      todo.completed = newTodo.completed;
      todo.priority = newTodo.priority;
    },
    deleteTodo: (state, id) => {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    cleanCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
  actions: {},
};
