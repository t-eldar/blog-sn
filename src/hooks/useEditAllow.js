import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useEditAllow = (editingObject) => {

	const [isEditAllowed, setIsEditAllowed] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		if (user !== null
			&& (user?.role === 'Moderator'
				|| user?.role === 'Admin'
				|| user?.id === editingObject.applicationUserId)) {
			setIsEditAllowed(true);
		} else {
			setIsEditAllowed(false);
		}
	}, [user, editingObject]);

	return isEditAllowed;
}