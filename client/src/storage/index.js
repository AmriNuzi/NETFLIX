const STORE_KEY = 'access-token';
export const getToken = () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzVhYzE2ZTY2NjE1NWI4MjMwOTFmNSIsImlzQWRtaW4iOnRydWUsInVzZXJuYW1lIjoibnV6aSIsImlhdCI6MTY2NDgwNDg0NywiZXhwIjoxNjY1MjM2ODQ3fQ.MiRwjzE2qxTK26XHWksWcpcjWY-aM3KLjBU4eOd97cw'
// export const getToken = () => localStorage.getItem(STORE_KEY);

export const setToken = (token) => localStorage.setItem(STORE_KEY, token);
