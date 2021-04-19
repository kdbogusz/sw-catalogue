import React from "react";
import Person, { age } from "./person";

const DetailedElement = (props: { person: Person; odd: boolean }) => {
  const person: Person = props.person;
  const [personAge, setPersonAge] = React.useState(age(person.birth_year));

  return (
    <div className={props.odd ? "oddColor" : "evenColor"}>
      <h2>{person.name}</h2>
      <div className="detailedElement">
        <div
          className="detailedElementColumn"
          style={
            props.odd
              ? { backgroundColor: "#DDD" }
              : { backgroundColor: "#AAA" }
          }
        >
          <div>
            <h4>Gender: </h4>
          </div>
          <div>
            <h4>Birth Year: </h4>
          </div>
          <div>
            <h4>Age: </h4>
          </div>
          <div>
            <h4>Height: </h4>
          </div>
        </div>

        <div className="detailedElementColumn"
          style={
            props.odd
              ? { alignItems: "center", backgroundColor: "#DDD" }
              : { alignItems: "center", backgroundColor: "#AAA" }
          }>
          <div>
            <p>{person.gender}</p>
          </div>
          <div>
            <p>{person.birth_year}</p>
          </div>
          <div>
            <p>{personAge}</p>
          </div>
          <div>
            <p>{person.height}</p>
          </div>
        </div>

        <div className="filmList"
          style={
            props.odd
              ? { backgroundColor: "#DDD" }
              : { backgroundColor: "#AAA" }
          }>
          <div>
            <h3>Films:</h3>
          </div>
          {person.filmTitles?.map((title) => {
            return (
              <div>
                <p>{title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailedElement;
