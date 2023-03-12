import {useContext, useState} from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import {useQuery} from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import adoptPetContext from "./AdoptPetContext";
import AdoptPetContext from "./AdoptPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: ''
    })
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const results = useQuery(['search', requestParams], fetchSearch);
    const [adoptedPet] = useContext(AdoptPetContext);

    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target);
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
                        <img src={adoptedPet?.images[adoptedPet.activeImage]} alt={adoptedPet?.name} />
                    </div>
                ) : null}
                <label htmlFor="location">Location</label>
                <input
                    name="location"
                    type="text"
                    id="location"
                    placeholder="Location"
                />
                <label htmlFor="animal">Animal</label>
                <select
                    name="animal"
                    id="animal"
                    value={animal}
                    onChange={(event) => {
                        setAnimal(event.target.value);
                    }}
                >
                    {ANIMALS.map((animal) => (
                        <option value={animal} key={animal}>
                            {animal}
                        </option>
                    ))}
                </select>

                <label htmlFor="breed">Breed</label>
                <select name="breed" id="breed" disabled={!breeds.length}>
                    {breeds.map((breed) => (
                        <option value={breed} key={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;
