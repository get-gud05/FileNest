import React from "react";

export default function AuthForm({ title, onSubmit, onToggle, toggleText, children, error }) {
  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8 shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          {title}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-400">
        {toggleText}{" "}
        <button
          onClick={onToggle}
          className="text-blue-500 hover:underline font-semibold"
          type="button"
        >
          here
        </button>
      </p>
    </div>
  );
}
