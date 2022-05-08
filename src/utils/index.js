export const formatDate = (stringDate) => {

	const currentDate = new Date();
	let date = new Date(stringDate);
	date = new Date(Date.UTC(
		date.getFullYear(), date.getMonth(), date.getDate(), 
		date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));

	let day = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	let hour = date.getHours();
	let minute = date.getMinutes();

	if (day < 10)
		day = `0${day}`;
	if (month < 10)
		month = `0${month}`;
	if (minute < 10)
		minute = `0${minute}`;
	let result = `${day}.${month}.${year} ${hour}:${minute}`;

	if (currentDate.getFullYear() !== year)
		result = `${day}.${month}.${year} 
			${hour}:${minute}`;
	else if (currentDate.getMonth() != month)
		result = `${day}.${month}
			${hour}:${minute}`;
	else if (currentDate.getDate() - day == 1)
		result = `вчера в ${hour}:${minute}`;
	else if (currentDate.getDate() != day)
		result = `${day}.${month}
			${hour}:${minute}`;
	else if (currentDate.getHours() - hour >= 1)
		result = currentDate.getHours() - hour + ' час';
	else if (currentDate.getMinutes() - minute >= 1)
		result = currentDate.getMinutes() - minute + ' мин';
	else if (currentDate.getSeconds() - date.getSeconds() < 60)
		result = 'только что';
	return result;
}

export const cutText = (text, limit) => {
	text = text.trim();
	if (text.length <= limit) 
		return text;

	text = text.slice(0, limit);
	const lastSpace = text.lastIndexOf(" ");
	if (lastSpace > 0) { // нашлась граница слов, ещё укорачиваем
		text = text.substr(0, lastSpace);
	}
	return text + "...";
}