import React, { useState } from "react";

const AddMovie = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("movie");
  const [imageBase64, setImageBase64] = useState("");

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  const saveForm = (e) => {
    e.preventDefault();

    const newMovie = {
      title: name,
      description,
      country,
      year,
      type,
      poster_path: imageBase64, // Assuming the API accepts base64 for images
    };

    // Example POST request
    fetch(
      "https://api.themoviedb.org/3/movie?api_key=b3c8574ec4e0950c0501b1bf409be1e0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie added successfully:", data);
        // Clear the form
        setName("");
        setDescription("");
        setCountry("");
        setYear("");
        setType("movie");
        setImageBase64("");
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-1/3 p-4 bg-gray-100 flex items-center flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">Upload Picture</h2>
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={convertToBase64}
          />
        </div>
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-6">Movie/Series Form</h2>
          <form onSubmit={saveForm}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title"
                className="w-full border border-gray-300 rounded-md p-2"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter description"
                rows="4"
                className="w-full border border-gray-300 rounded-md p-2"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter country"
                className="w-full border border-gray-300 rounded-md p-2"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                placeholder="Enter year"
                className="w-full border border-gray-300 rounded-md p-2"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <fieldset className="mb-6 flex-row flex items-center justify-between">
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </legend>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="movie"
                  name="type"
                  value="movie"
                  className="mr-2"
                  checked={type === "movie"}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="movie" className="text-sm text-gray-700">
                  Movie
                </label>
              </div>
              <div className="flex items-center mr-96">
                <input
                  type="radio"
                  id="series"
                  name="type"
                  value="series"
                  className="mr-2"
                  checked={type === "series"}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="series" className="text-sm text-gray-700">
                  Series
                </label>
              </div>
            </fieldset>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md"
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
