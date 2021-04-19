import Person from "./person";

export interface Filters {
    name: string;
    title: string;
  }

export const nameFilter = (list: Person[], filter: string) => {
  return list.filter((person) => {
    return person.name?.toLowerCase().match(`${filter.toLowerCase()}`);
  });
};

export const filmsFilter = (list: Person[], filter: string) => {
  return list.filter((person) => {
    if (person.filmTitles) {
        const thing = person.filmTitles
        .map((title) => {
           return new RegExp(`${filter.toLowerCase()}`).test(title.toLowerCase());
        });
      return thing.some((x) => x === true);
    } else {
        return false;
    }
  });
};

export const compositeFilter = (list: Person[], filters: Filters) => {
    return filmsFilter(nameFilter(list, filters.name), filters.title);
  };
