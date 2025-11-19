import React, { useEffect, useState } from "react";
import Upload from "./Upload";
import ImageItem from "./ImageItem";
import Modal from "./Modal";

function Gallery({ username }) {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const res = await fetch(`http://localhost:5000/api/images/${username}`);
    const files = await res.json();
    setImages(files);
  }

  return (
    <>
      <Upload username={username} onUpload={fetchImages} />
      {images.length === 0 ? (
        <p className="text-gray-400 mt-10 text-center">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
          {images.map((img) => (
            <ImageItem
              key={img}
              image={img}
              username={username}
              onClick={() => setModalImage(img)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={!!modalImage} onClose={() => setModalImage(null)}>
        {modalImage && (
          <img
            src={`http://localhost:5000/uploads/${username}/${modalImage}`}
            alt={modalImage}
            className="max-w-full max-h-screen rounded-lg shadow-lg"
          />
        )}
      </Modal>
    </>
  );
}

export default Gallery;
