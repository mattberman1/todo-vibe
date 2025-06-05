'use client';

import { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900 text-center tracking-tight">
        Todo List
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Add Todo Form */}
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-medium mb-6 text-gray-800">Add New Todo</h2>
          <form onSubmit={addTodo}>
            <div className="space-y-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Add Todo
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Todo List */}
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-medium mb-6 text-gray-800">Your Todos</h2>
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 rounded-full border-gray-300 text-blue-500 focus:ring-blue-400 transition-all duration-200"
                />
                <span
                  className={`flex-1 text-gray-700 ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
            {todos.length === 0 && (
              <li className="text-gray-400 text-center py-8 bg-white/50 rounded-xl border border-gray-100">
                No todos yet. Add one to get started!
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
} 