import { MAIN_API_LINK, API_LINK } from "./constans";

export const moviesApi =({
  link: API_LINK,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mainApi = ({
  link: MAIN_API_LINK,
  headers: {
    "Content-Type": "application/json",
  },
});