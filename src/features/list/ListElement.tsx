import React from "react";
import { CSSTransition } from "react-transition-group";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setHightlight, selectHighlight, getMovieTitles, selectLoaded } from "./listSlice";
import Person from "./person";

import "./listStyles.css";
import DetailedElement from "./DetailedElement";

const ListElement = (props: { person: Person, odd: boolean }) => {
  const person: Person = props.person;
  const highlightId: number = useAppSelector(selectHighlight);
  const loaded = useAppSelector(selectLoaded);

  const dispatch = useAppDispatch();
  const handleHighlight = () => {
    console.log(loaded);
    dispatch(setHightlight(person.id));
  };
  
  React.useEffect(() => {
    if (person.films && person.films.length > 0) {
      dispatch(getMovieTitles(person.id));
    }
  }, []);

  return (
    <>
      <CSSTransition
        in={highlightId === person.id}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div
        onClick={handleHighlight}><DetailedElement person={person} odd={props.odd}/></div>

      </CSSTransition>
      {highlightId !== person.id && (
        <div className={props.odd ? "listRowOdd" : "listRowEven"} key={person.id} onClick={handleHighlight}>
          <p>{person.name}</p>
          <p>{person.gender}</p>
          <p>{person.birth_year}</p>
        </div>
      )}
    </>
  );
};

export default ListElement;
