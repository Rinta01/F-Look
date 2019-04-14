import { createContext } from 'react';

export default createContext({
	addNotification: (token, userId, tokenExpiration) => {},
});
