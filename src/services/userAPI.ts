import { UserType } from '../types';

const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

const readUser = (): UserType => JSON.parse(localStorage.getItem(USER_KEY) as string);
const saveUser = (user: UserType) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response: any) => (callback: (param: any) => void) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = (): Promise<UserType> => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {} as UserType;
  }
  simulateRequest(user)(resolve);
});

export const createUser = (user: UserType | { name: string })
: Promise<'OK'> => new Promise((resolve) => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  simulateRequest(SUCCESS_STATUS)((res) => {
    saveUser({ ...emptyUser, ...user });
    resolve(res);
  });
});

export const updateUser = (updatedUser: UserType): Promise<'OK'> => new Promise(
  (resolve) => {
    simulateRequest(SUCCESS_STATUS)((res) => {
      saveUser({ ...updatedUser });
      resolve(res);
    });
  },
);
