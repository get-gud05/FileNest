import React, { useState } from "react";
import {Login} from "./Login";
import {Register} from "./Register";
import Gallery from "./Gallery";

function Navbar({ onLogout, username }) {
  return (
    <nav className="backdrop-blur bg-black/50 sticky top-0 z-50 w-full flex justify-between items-center px-6 py-4 text-white shadow-md">
      <div className="text-2xl font-bold tracking-wide">FileNest</div>
      <div className="flex items-center space-x-4">
        {username && (
          <>
            <span className="hidden sm:inline">Hello, {username}</span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="backdrop-blur bg-black/50 text-gray-300 text-center py-6 mt-12">
      <p>&copy; 2025 FileNest. All rights reserved.</p>
    </footer>
  );
}

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="dark bg-gray-900 min-h-screen flex flex-col">
      <Navbar onLogout={() => {
        setUser(null);
        localStorage.removeItem("user");
      }} username={user} />

      <main className="flex-grow container mx-auto px-4 py-8">
        {!user ? (
          showRegister ? (
            <Register
              onRegister={(u) => {
                setUser(u);
                setShowRegister(false);
              }}
              onShowLogin={() => setShowRegister(false)}
            />
          ) : (
            <Login onLogin={(u) => setUser(u)} onShowRegister={() => setShowRegister(true)} />
          )
        ) : (
          <Gallery username={user} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
