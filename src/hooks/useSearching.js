import { useMemo } from "react";

export const useSearching = (array, searchKey, query) => {
	const searchedArray = useMemo(() => {
		return array.filter(
			item => item[searchKey]
				.toLowerCase()
				.includes(query.toLowerCase()))
	}, [array, query])

	return searchedArray;
}