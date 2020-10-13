// import useState next to FunctionComponent
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

interface MatchProps{
    uid: string;
}

// const Greeting = (props: GreetingProps) => {
//     return <h1>Hello {props.name}</h1>
// }
function MatchList(props: MatchProps) {
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/match`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
          setMatchList(response);
          console.log(response);    
      })
      .catch(error => console.log(error));
  }, []);
  
return (<div>
    {matchList.map((c: any, index) => (
        <div key={index}>
          {c.uid && (
            <>
              <div>
                <h3>
                 <Link to={`/match/${c.uid}`}> {c.title} </Link>
                </h3>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
      </div>
    )
  }

export default MatchList;