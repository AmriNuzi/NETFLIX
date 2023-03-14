const STORE_KEY = 'access-token';

 const getToken = () => {
   const token_value = localStorage.getItem(STORE_KEY);
  if(token_value){
    return JSON.parse(token_value);
  }else{
    return null;
  }
}
 const setToken = (token) => localStorage.setItem(STORE_KEY, JSON.stringify(token));


 const removeToken = () =>{
  localStorage.removeItem(STORE_KEY)
 }

 export {getToken, setToken, removeToken};

// const STORE_KEY = 'access-token';
// export const getToken = () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTM3ZTUzMTYzYzIxZTM4ZjFlMWY0YiIsImlzQWRtaW4iOnRydWUsInVzZXJuYW1lIjoiYW1yaSIsImlhdCI6MTY3MDYxMzI1MiwiZXhwIjoxNjcxMDQ1MjUyfQ.NZJdfwvKHXBTncgRUKyBs1PjFcyBONC72jPi-psRL2Q'
// // export const getToken = () => localStorage.getItem(STORE_KEY);

// export const setToken = (token) => localStorage.setItem(STORE_KEY, token);
