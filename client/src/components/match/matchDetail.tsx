import React from 'react';
import { useEffect, useState } from 'react';

interface MatchProps{
    uid: string;
}

interface MatchInformation{
    MatchIdFromApi: string;
    Started: Date;
    finished: Date;
    lastUpdate: Date;
    matchUid: number;
    uid: number;
}

interface IMatch{
    Started: Date
    bestOf: number;
    competitorType: number;
    finished: Date;
    lastUpdate: Date;
    title: string;
    uid: number;
    matchInformation: MatchInformation[];
}

function MatchDetail(props: MatchProps){
  const [match, setMatch] = useState<IMatch>();
  
  let typedMatch: IMatch;

  useEffect(() => {
    fetch(
      `http://localhost:4000/match/${props.uid}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
          setMatch(response);
          console.log(response);    
      })
      .catch(error => console.log(error));
  }, [props.uid]);
  
  return (
  <div>
      <h5>{match?.title}</h5>
      <ul>
      {
          match?.matchInformation.map((c: MatchInformation, index) => (
          <li key={index}>match information id: {c.uid}</li>
          ))
      }
    </ul>
   </div>
  )
}

export default MatchDetail;