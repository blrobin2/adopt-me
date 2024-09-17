import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { all } from "./searchParamsSlice";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { useSearchQuery } from "./petApiService";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const searchParams = useSelector((state) => state.searchParams.value);

  const { data: results } = useSearchQuery(searchParams);
  const pets = results?.pets ?? [];
  const endingPage =
    results?.numberOfResults > 0 ? Math.ceil(results?.numberOfResults / 10) : 0;
  const paginationNumbers =
    endingPage >= 0 ? [...Array(endingPage).keys()] : [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
            page: 0,
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
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
          <select disabled={!breeds.length} id="breed" name="breed">
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
      {paginationNumbers.length > 0
        ? paginationNumbers.map((i) => (
            <button
              style={{ display: "inline-block" }}
              key={i}
              onClick={() => dispatch(all({ ...searchParams, page: i }))}
            >
              {i + 1}
            </button>
          ))
        : null}
    </div>
  );
};

export default SearchParams;
