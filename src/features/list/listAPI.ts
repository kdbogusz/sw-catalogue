import Person from "./person";

export function fetchPerson(id: Number) {
  return fetch(`https://swapi.dev/api/people/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newPerson: Person = {...data, id};
        return newPerson;
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
}

export function fetchFilm(url: string): Promise<string> {
  return fetch("https" + url.slice(4), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data.title;
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
}
