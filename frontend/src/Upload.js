import React, { useState } from "react";

function Upload({ username, onUpload }) {
  const [file, setFile] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    await fetch(`http://localhost:5000/api/upload/${username}`, {
      method: "POST",
      body: data,
    });
    setFile(null);
    onUpload();
  }

  return (
    <form
      onSubmit={handleUpload}
      className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white cursor-pointer"
        required
      />
      <button
        type="submit"
        disabled={!file}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold text-white transition disabled:bg-gray-600"
      >
        Upload
      </button>
    </form>
  );
}

export default Upload;
