import { useEffect, useMemo, useState } from "react"

/**
 * Hook that validates value
 * @param {any} value 
 * @param {Array} validations each validation must return 
 * message and invalid, onDependenciesChange if validate on deps change
 * @param {Array} dependencies
 * @return {Boolean} isValid
 * @return {String} errorMessage
 */
export const useValidation = (value, validations, dependencies) => {

	const [errorMessage, setErrorMessage] = useState('');
	const [isInvalid, setIsInvalid] = useState(true);

	useEffect(() => {
		for (let validation of validations) {
			const { invalid, message } = validation(value);

			setErrorMessage(message);
			setIsInvalid(invalid);
			if (invalid)
				break;
		}
	}, [value, dependencies]);
	return [isInvalid, errorMessage]
}