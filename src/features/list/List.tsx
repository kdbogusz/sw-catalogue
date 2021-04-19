import React from "react";
import Loader from "react-loader-spinner";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addPeople,
  selectFiltered,
  selectId,
  selectLoaded,
  selectPeople,
} from "./listSlice";
import ListElement from "./ListElement";

import "./listStyles.css";

const List = () => {
  const id = useAppSelector(selectId);
  const people = useAppSelector(selectPeople);
  const filtered = useAppSelector(selectFiltered);
  const dispatch = useAppDispatch();
  const loaded = useAppSelector(selectLoaded);

  React.useEffect(() => {
    dispatch(addPeople(10));
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as Element;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      dispatch(addPeople(5));
    }
  };

  return (
    <>
      <div className={loaded ? "listWithButton" : "hidden"}>
        <button type="button" onClick={() => dispatch(addPeople(5))}>
          ADD MORE
        </button>
        <div className="list" onScroll={handleScroll}>
          <div className="listElement">
            <div className="listRowHeader">
              <p>Name</p>
              <p>Gender</p>
              <p>Birth Year</p>
            </div>
          </div>
          {people.map((person) => {
            return (
              <div
                className={filtered.includes(person) ? "listElement" : "hidden"}
              >
                <ListElement
                  person={person}
                  odd={filtered.indexOf(person) % 2 == 1}
                />
              </div>
            );
          })}
        </div>
      </div>
      {!loaded && (
        <div className="listWithButton">
          <Loader type="RevolvingDot" color="#222" height={100} width={100} />
        </div>
      )}
    </>
  );
};

export default List;
