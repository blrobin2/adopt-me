import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
    page: 0,
  });
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const endingPage =
    results?.data?.numberOfResults > 0
      ? Math.ceil(results?.data?.numberOfResults / 10)
      : 0;
  const paginationNumbers =
    endingPage >= 0 ? [...Array(endingPage).keys()] : [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="rounded-lg mb-10 flex flex-col items-center justify-center bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
            page: 0,
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input type="text" id="location" name="location" placeholder="Location" className="search-input" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed" className="search-input grayed-out-disabled">
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">Submit</button>
      </form>

      <Results pets={pets} />
      {paginationNumbers.length > 0
        ? paginationNumbers.map((i) => (
            <button
              key={i}
              className={`rounded px-6 py-2 text-white hover:opacity-50 border-none  inline-block ${requestParams.page === i ? 'bg-orange-400' : 'bg-orange-500' }`}
              onClick={() => {
                setRequestParams({ ...requestParams, page: i });
              }}
            >
              {i + 1}
            </button>
          ))
        : null}
    </div>
  );
};

export default SearchParams;
