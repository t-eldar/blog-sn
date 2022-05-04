import { useEffect, useMemo, useState } from "react"

/**
 * Hook that validates value
 * @param {any} value 
 * @param {Array} validations each validation must return message and invalid
 * @return {Boolean} isValid
 * @return {String} errorMessage
 */
export const useValidation = (value, validations) => {

	const [errorMessage, setErrorMessage] = useState('');
	const [isInvalid, setIsInvalid] = useState(true);

	console.log('useValidation start');

	useEffect(() => {
		for (let validation of validations) {
			const { invalid, message } = validation(value);
			console.log('useValidation iteration')
			setErrorMessage(message);
			setIsInvalid(invalid);
			console.log(invalid)
			console.log(message)
		}
	}, [value]);
	return [isInvalid, errorMessage]

	// return useMemo(() => {
	// 	console.log('useValidation value')
	// 	console.log(value)
	// 	for (let validation of validations) {
	// 		const { invalid, message } = validation(value);
	// 		console.log('useValidation iteration')
	// 		setErrorMessage(message);
	// 		setIsInvalid(invalid);
	// 		// if (invalid) {
	// 		// 	break;
	// 		// }
	// 		console.log(invalid)
	// 		console.log(message)
	// 	}
	// 	return [isInvalid, errorMessage]
	// }, [value])
}