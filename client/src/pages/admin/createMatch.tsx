import { AnyARecord } from 'dns';
import React, { FormEvent, useEffect, useState } from 'react';
import AdminMenu from '../../components/adminMenu';
import MatchInformation from '../../components/match/matchInformation';
import postData from '../../helpers/postHelper';
import useFetch from '../../hooks/useFetch';
import Async from 'react-select/async'

export interface MatchInformation {
    lastUpdate:     Date;
    match:          MatchResponse;
    MatchIdFromApi: null;
    Started:        null;
    finished:       null;
    uid:            number;
    matchUid:       number;
}

export interface MatchResponse {
    title:            string;
    competitorType:   string;
    bestOf:           number;
    teamOne:          string[];
    teamTwo:          string[];
    lastUpdate:       Date;
    matchInformation: MatchInformation[];
    Started:          Date;
    finished:         Date;
    uid:              number;
}

export enum CompetitorTypeEnum{
    OneVsOne,
    TwoVsTwo,
    ThreeVsThree,
    FourVsFour,
    FreeForAll
}

export default function CreateMatch(props: any){
    const defaultMatchObj: MatchResponse = {
        title: '',
        bestOf: 1,
        teamOne: ["0"],
        teamTwo: [],
        competitorType: "OneVsOne",
        Started: new Date(),
        finished: new Date(),
        uid: 0,
        lastUpdate: new Date(),
        matchInformation: []
    }
    let [matchForm, setMatchForm] = useState<MatchResponse>(Object.entries(props.match.params).length !== 0 ? 
    props.match.params : defaultMatchObj);

    const onChangeHandler = (e: any) => {
        if(e.target.value == "FourVsFour"){
            setMatchForm({...matchForm, [e.target.name]: e.target.value, teamOne: ["","","",""],
            teamTwo: ["","","",""]});
        }else{
            setMatchForm({...matchForm, [e.target.name]: e.target.value, teamOne: [""],
            teamTwo: [""]});
        }
    }

    const onTeamOneChangeHandler =(idx: any) => (e: any) => {
        const players = matchForm.teamOne.map((player, sidx) => {
            if (idx !== sidx) return player;
            return e.target.value;
        });
        setMatchForm({...matchForm, [e.target.name]: players});
    }

    const onTeamTwoChangeHandler =(idx: any) => (e: any) => {
        const players = matchForm.teamTwo.map((player, sidx) => {
            if (idx !== sidx) return player;
            return e.target.value;
        });
        setMatchForm({...matchForm, [e.target.name]: players});
    }
    
    const submitForm = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
      //   let resp: MatchResponse = await postData(`http://localhost:4000/match`, matchForm);
          console.log("Response", matchForm);
        // setMatchForm(resp);
      };
      
    let competitorOpt = [];
    for (let item in CompetitorTypeEnum) {
        if (isNaN(Number(item))) {
            competitorOpt.push({value: item, label: item});
        }
    }
    let bestOfOpt = [];
    for (let i=0; i<23; i++) {
        if (i % 2 > 0) {
            bestOfOpt.push(i);
        }
    }

      const defaultd = {uid: "6", name: "Nicov"};

      const filterColors = (inputValue: any) => {
        return inputValue.forEach((element: any) => {
            return {value: element.name, label: element.name};
        })
      };
      
      const promiseOptions = (inputValue: any) =>
        fetch(`http://localhost:4000/player?search=${inputValue}`).then(v => v.json()).then(b => b.data);
    

    return(
        <div className="w-full mx-auto pt-10">
            <div className="p-4">
                <div className="flex mb-4">
                    <div className="w-1/6 p-2 text-center"></div>
                    <div className="w-1/4 p-2 text-center">
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className="w-5/6 p-2 text-center">
             <div className="w-full">
                <div className="flex flex-wrap">
                    <div  className="w-full">
                            <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                                <div className="border-b p-3">
                                    <h5 className="font-bold uppercase text-blue-600">Match information</h5>
                                </div>
                                <div className="p-5">
                                <div className="flex">
                                   <form className="flex w-full" onSubmit={submitForm}>
                                <div className="flex-1 pr-4">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Title
                                        </label>
                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                        name="title"
                                        onChange={onChangeHandler}
                                        value={matchForm.title}
                                        id="grid-first-name" type="text" placeholder="Jane"/>
                                        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Match Type
                                        </label>
                                        <div className="relative">
                                            <select onChange={onChangeHandler} value={matchForm.competitorType} name="competitorType" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                {competitorOpt.map((c) =>
                                                 <option key={c.value} value={c.value}>{c.label}</option>
                                                )}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3 mb-4">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Best of
                                        </label>
                                        <div className="relative">
                                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            {bestOfOpt.map((v)=>
                                                 <option value={v}>{v}</option>
                                            )}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                         <div className="flex flex-row">
                                        {matchForm.teamOne.map((v, idx)=>
                                        <div key={idx} className="flex">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                              Player {idx + 1}
                                          </label>
                                          <div className="relative">
                                              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                              name="teamOne"
                                              placeholder={idx + "1"}
                                              value={v}
                                              onChange={onTeamOneChangeHandler(idx)}
                                              id="grid-first-name" type="text" />
                                          </div>
                                          </div>
                                        )}
                                        </div>
                                        </div>
                                        {/* <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Player 2
                                        </label>
                                        <div className="relative">
                                           <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            name="player2"
                                            value={matchForm.teamTwo}
                                            onChange={onChangeHandler}
                                           id="grid-first-name" type="text" placeholder="Jane"/>
                                        </div>
                                        </div> */}
                                        <div className="w-full md:w-1/2 px-3">
                                        {/* <Select options={options} /> */}
                                        <Async defaultOptions 
                                        cacheOptions
                                        isClearable
                                        defaultValue={defaultd}
                                        loadOptions={promiseOptions}
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.uid} />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-2">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Start date
                                        </label>
                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                         name="startDate"
                                         value={matchForm.Started?.toLocaleDateString()}
                                         onChange={onChangeHandler}
                                        id="grid-city" type="text" placeholder="Albuquerque"/>
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" />
                                            <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold ml-2">Automatic retrieval update</div>
                                        </div>
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
                                  </div>
                                </form>
                                 </div>
                                </div>
                            </div>
                         
                         <div className="flex flex-row">
                             {matchForm.matchInformation.map((mInfo) =>
                               <MatchInformation key={mInfo.uid.toString()} matchInformation={mInfo}></MatchInformation>
                             )}
                        </div>
                    </div>
                </div>
            </div> 

                    </div>
                    <div className="w-1/5 p-2 text-center">
                    </div>
                    <div className="w-1/6 p-2 text-center">
                    </div>
                </div>
                </div>
         </div>
    );
}