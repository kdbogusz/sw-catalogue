import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchPerson, fetchFilm } from "./listAPI";
import Person from "./person";
import { compositeFilter } from "./filters";
import type { Filters } from "./filters";

export interface ListState {
  id: number;
  status: "idle" | "loading" | "failed";
  people: Person[];
  highlight: number;
  filters: Filters;
}

const initialState: ListState = {
  id: 1,
  status: "idle",
  people: [],
  highlight: 0,
  filters: {
    name: "",
    title: "",
  },
};

export const fetchFilmTitle = createAsyncThunk(
  "list/fetchTitle",
  async (props: { film: string; id: number }) => {
    const response = await fetchFilm(props.film);
    return { response, id: props.id };
  }
);

export const addPerson = createAsyncThunk(
  "list/fetchPerson",
  async (id: number) => {
    const response = await fetchPerson(id);
    return { ...response, id };
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setHightlight: (state, action: PayloadAction<number>) => {
      if (state.highlight === action.payload) {
        state.highlight = 0;
      } else {
        state.highlight = action.payload;
      }
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.name = action.payload;
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.filters.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPerson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPerson.fulfilled, (state, action) => {
        state.status = "idle";
        const newPerson: Person = action.payload;
        state.id += 1;
        if (newPerson.name) {
          state.people = [...state.people, newPerson];
        }
      })
      .addCase(fetchFilmTitle.fulfilled, (state, action) => {
        const id = action.payload.id;
        const title = action.payload.response;
        const newPeople = state.people.filter((person) => {
          return person.id !== id;
        });
        const getPerson = () => {
          const found = state.people.filter((person) => {
            return person.id === id;
          });
          return found.length > 0 ? found[0] : undefined;
        };
        const person = getPerson();
        if (person && person.films) {
          if (person.filmTitles) {
            state.people = [
              ...newPeople,
              {
                ...person,
                filmTitles: [...person.filmTitles, title],
              },
            ];
          } else {
            state.people = [
              ...newPeople,
              {
                ...person,
                filmTitles: [title],
              },
            ];
          }
        }
      });
  },
});

export const {
  setHightlight,
  setNameFilter,
  setTitleFilter,
} = listSlice.actions;

export const selectId = (state: RootState) => state.list.id;
export const selectPeople = (state: RootState) => state.list.people;
export const selectPerson = (state: RootState, id: number) => {
  const found = state.list.people.filter((person) => {
    return person.id === id;
  });
  return found.length > 0 ? found[0] : undefined;
};
export const selectStatus = (state: RootState) => state.list.status;
export const selectHighlight = (state: RootState) => state.list.highlight;
export const selectFiltered = (state: RootState) =>
  compositeFilter(state.list.people, state.list.filters);
export const selectLoaded = (state: RootState) => {
  return !state.list.people
    .map((person) => {
      if (!person.films) {
        return true;
      } else if (!person.filmTitles) {
        return false;
      } else {
        return person.films.length === person.filmTitles.length;
      }
    })
    .some((x) => x === false);
};

export const addPeople = (amount: number): AppThunk => (dispatch, getState) => {
  const currentId = selectId(getState());
  for (let i: number = 0; i < amount; i++) {
    dispatch(addPerson(currentId + i));
  }
};

export const getMovieTitles = (id: number): AppThunk => (
  dispatch,
  getState
) => {
  const person: Person | undefined = selectPerson(getState(), id);
  if (person && person.films) {
    const filmUrls: string[] = person.films;
    for (let i: number = 0; i < filmUrls.length; i++) {
      dispatch(fetchFilmTitle({ film: filmUrls[i], id }));
    }
  }
};

export default listSlice.reducer;
