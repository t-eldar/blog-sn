import { useMemo } from "react";

export const useSorting = (array, sorting) => {
	const sortedArray = useMemo(() => {
		if (sorting) {
			return [...array].sort(
				(a, b) => {
					if (typeof(a[sorting]) === 'number' && typeof(b[sorting]) === 'number') {
						return b[sorting] - a[sorting]
					}
					return b[sorting].localeCompare(a[sorting])
				}
			)
		}
		else
			return array;
	}, [sorting, array]);

	return sortedArray;
}