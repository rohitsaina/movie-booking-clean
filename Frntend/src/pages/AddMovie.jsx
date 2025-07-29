import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    language: '',
    genre: '',
    poster: null,
    banner: null,
    actress: '',
    director: '',
    musicDirector: '',
    producer: ''
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log('Submitted movie data:', formData);
    // After submission, navigate back to admin dashboard or movies tab
    navigate('/admin');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Movie Name</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
          <input
            type="text"
            name="language"
            id="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Type of Movie (Genre)</label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="poster" className="block text-sm font-medium text-gray-700">Poster</label>
          <input
            type="file"
            name="poster"
            id="poster"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner</label>
          <input
            type="file"
            name="banner"
            id="banner"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="actress" className="block text-sm font-medium text-gray-700">Actress</label>
          <input
            type="text"
            name="actress"
            id="actress"
            value={formData.actress}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="director" className="block text-sm font-medium text-gray-700">Director</label>
          <input
            type="text"
            name="director"
            id="director"
            value={formData.director}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="musicDirector" className="block text-sm font-medium text-gray-700">Music Director</label>
          <input
            type="text"
            name="musicDirector"
            id="musicDirector"
            value={formData.musicDirector}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label htmlFor="producer" className="block text-sm font-medium text-gray-700">Producer</label>
          <input
            type="text"
            name="producer"
            id="producer"
            value={formData.producer}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
