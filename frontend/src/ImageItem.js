import React, { useState } from "react";

function ImageItem({ image, username, onClick }) {
  const imageUrl = `http://localhost:5000/uploads/${username}/${image}`;
  const [shareUrl, setShareUrl] = useState("");

  async function handleShare(e) {
    e.stopPropagation(); 
    const res = await fetch(`http://localhost:5000/api/share/${username}/${image}`);
    const data = await res.json();
    setShareUrl(data.url);
    navigator.clipboard.writeText(data.url);
    alert(`Image link copied to clipboard!`);
  }

  function handleDownload(e) {
    e.stopPropagation();
    window.open(`http://localhost:5000/api/download/${username}/${image}`);
  }

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={image}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="flex justify-between items-center px-4 py-3 bg-gray-900">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm font-semibold text-white transition"
        >
          Download
        </button>
        <button
          onClick={handleShare}
          className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md text-sm font-semibold text-white transition"
        >
          Share
        </button>
      </div>
      {shareUrl && (
        <p className="text-xs text-gray-400 mt-1 px-4 break-all">{shareUrl}</p>
      )}
    </div>
  );
}

export default ImageItem;
