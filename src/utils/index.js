import AuthService from "../api/AuthService";
import CategoriesService from "../api/CategoriesService";
import CommentsService from "../api/CommentsService";
import PostsService from "../api/PostsService";
import RatingsService from "../api/RatingsService";
import UsersService from "../api/UsersService";

export const formatDate = (stringDate) => {

	let currentDate = new Date();
	let date = new Date(stringDate);
	// date = new Date(Date.UTC(
	// 	date.getFullYear(), date.getMonth(), date.getDate(),
	// 	date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()
	// ));

	// currentDate = new Date(Date.UTC(
	// 	currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
	// 	currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds()
	// ));

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

	const timeDiff = currentDate.getTime() - date.getTime();

	if (timeDiff < 0)
		return `${day}.${month}.${year} ${hour}:${minute}`;

	if (timeDiff < 60000)
		return 'только что';

	if (timeDiff < 3600000)
		return Math.round(timeDiff / 1000 / 60) + ' мин';

	if (timeDiff < 18000000)
		return Math.round(timeDiff / 1000 / 60 / 60) + ' час';

	if (currentDate.getFullYear() !== year)
		return `${day}.${month}.${year} ${hour}:${minute}`;

	if (currentDate.getMonth() != month)
		return `${day}.${month} ${hour}:${minute}`;

	if (currentDate.getDate() == day)
		return `сегодня в ${hour}:${minute}`;

	if (currentDate.getDate() - day == 1)
		return `вчера в ${hour}:${minute}`;

	if (currentDate.getDate() != day)
		return `${day}.${month} ${hour}:${minute}`;
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

export const getNormalizedUserFromToken = (token) => {
	const encryptedUser = token.split('.')[1];
	const decryptedUser = JSON.parse(atob(encryptedUser));
	const normalizedUser = {};
	for (let value in decryptedUser) {
		normalizedUser[value.toLowerCase()] = decryptedUser[value];
	}
	return normalizedUser;
}

export const updateServices = () => {
	AuthService.updateInstance();
	CategoriesService.updateInstance();
	CommentsService.updateInstance();
	PostsService.updateInstance();
	RatingsService.updateInstance();
	UsersService.updateInstance();
}