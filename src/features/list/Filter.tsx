import React, { SyntheticEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setNameFilter, setTitleFilter } from "./listSlice";
import type { Filters } from "./filters";

const Filter = () => {
  const [filters, setFilters]: [Filters, any] = React.useState({
    name: "",
    title: "",
  });
  const dispatch = useAppDispatch();

  const submitHandler = (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(setNameFilter(filters.name));
      dispatch(setTitleFilter(filters.title));
  }

  return (
    <form onSubmit={submitHandler} className="filters">
      <label htmlFor="nameFilter">Name</label>
      <input
        type="input"
        id="nameFilter"
        name="nameFilter"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      ></input>
      <label htmlFor="nameFilter">Film</label>
      <input
        type="input"
        id="nameFilter"
        name="nameFilter"
        value={filters.title}
        onChange={(e) =>
          setFilters({ ...filters, title: e.target.value })
        }
      ></input>
      <button type="submit">FILTER</button>
    </form>
  );
};

export default Filter;
