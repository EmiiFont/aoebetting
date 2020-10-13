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

function MatchDetail({match, location}: any){
  const [matched, setMatch] = useState<IMatch>();
  console.log(matched);
  const { params: { uid } } = match;

  let typedMatch: IMatch;

  useEffect(() => {
    fetch(
      `http://localhost:4000/match/${uid}`,
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
      })
      .catch(error => console.log(error));
  }, [uid]);
  
  return (
  <div>
      <h5>{matched?.title}</h5>
      <code>{JSON.stringify(matched, null, 2)}</code>
      <ul>
      {
          matched?.matchInformation.map((c: MatchInformation, index) => (
          <li key={index}>match information id: {c.uid}</li>
          ))
      }
    </ul>
   </div>
  )
}

export default MatchDetail;