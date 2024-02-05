export const UNAUTHORIZED_ERROR = {
  status: 401,
  errorText: "Неправильный логин или пароль",
};

export const CONFLICT_ERROR = {
  status: 409,
  errorText: "Пользователь с такой почтой уже зарегистрирован.",
};