import { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import AdoptPetContext from "./AdoptPetContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import {Animal} from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });
    const [animal, updateAnimal] = useState("" as Animal);
    const [breeds] = useBreedList(animal);
    const results = useQuery(["search", requestParams], fetchSearch);
    const [adoptedPet] = useContext(AdoptPetContext);

    const pets = results?.data?.pets ?? [];

    return (
        <div className="my-0 mx-auto w-11/12 search-params">
            <form
                className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const data = {
                        animal: formData.get("animal") ?? "",
                        breed: formData.get("breed") ?? "",
                        location: formData.get("location") ?? "",
                    };
                    setRequestParams(data);
                }}
            >
                {adoptedPet ? (
                    <div className="pet image-container">
                        <img
                            src={adoptedPet.images[adoptedPet.activeImage || 0]}
                            alt={adoptedPet.name}
                        />
                    </div>
                ) : null}
                <label htmlFor="location">Location</label>
                <input
                    className="search-input"
                    name="location"
                    type="text"
                    id="location"
                    placeholder="Location"
                />
                <label htmlFor="animal">Animal</label>
                <select
                    className="search-input"
                    name="animal"
                    id="animal"
                    value={animal}
                    onChange={(event) => {
                        updateAnimal(event.target.value as Animal);
                    }}
                    onBlur={(event) => {
                        updateAnimal(event.target.value as Animal);
                    }}
                >
                    {ANIMALS.map((animal) => (
                        <option value={animal} key={animal}>
                            {animal}
                        </option>
                    ))}
                </select>

                <label htmlFor="breed">Breed</label>
                <select className="search-input grayed-out-disabled" name="breed" id="breed" disabled={!breeds.length}>
                    {breeds.map((breed) => (
                        <option value={breed} key={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
                <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
                    Submit
                </button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
