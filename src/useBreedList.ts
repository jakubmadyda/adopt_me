import {QueryStatus, useQuery} from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import {Animal} from "./APIResponsesTypes";

function useBreedList(animal: Animal) {
    const results = useQuery(['breeds', animal], fetchBreedList);

    return [results?.data?.breeds ?? [], results.status] as [string[], QueryStatus]
}

export default useBreedList;