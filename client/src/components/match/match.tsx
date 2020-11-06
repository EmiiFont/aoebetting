import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import useFetch from '../../hooks/useFetch';
import AdminMenu from '../adminMenu';
import Widget from '../widget';

export interface MatchResponse {
    title:            string;
    competitorType:   number;
    bestOf:           number;
    competitorOneUid: number;
    competitorTwoUid: number,
    lastUpdate:       Date;
    //matchInformation: MatchInformation[];
    Started:          Date;
    finished:         Date;
    uid:              number;
}

function Match(){
   const res = useFetch('http://localhost:4000/match', {});
    
    const matches = res.response;
    const error = res.error;
    const status = "waiting to start";

    if (!res.response) {
        return <div>Loading...</div>
      }
    
    function getColor(objMatch: MatchResponse){
        let color = "orange";
        const startedDate = new Date(objMatch.Started);
       
        //match is today
        if(startedDate.toLocaleDateString() == new Date().toLocaleDateString()){
            //match started
           if(startedDate.toLocaleTimeString() <= new Date().toLocaleTimeString()){
                color = "green";
           }
        }
        
        return color;
    }

    return (
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
                        <Widget title="Match List">
                            <div className="flex flex-col w-full">
                           <Link to={RouterPathEnum.ADMINAREA + '/match/create'}  className="w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Create match</Link>
                          
                           <table className="w-full">
                        <thead>
                            <tr>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Start Date
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Best of
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Competitors
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map((ma: MatchResponse) => 
                            <tr key={ma.uid.toString()}>
                            <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                <div className="flex items-center">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {ma.title}
                                        </p>
                                </div>
                            </td>
                            <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">{ma.Started}</p>
                            </td>
                            <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {ma.bestOf}
                                </p>
                            </td>
                            <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-900 whitespace-no-wrap">{ma.competitorOneUid}</p>
                                <p className="text-gray-900 whitespace-no-wrap">{ma.competitorTwoUid}</p>
                            </td>
                            <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                <span
                                    className={`relative inline-block px-3 py-1 font-semibold text-${getColor(ma)}-900 leading-tight`}>
                                    <span aria-hidden
                                        className={`absolute inset-0 bg-${getColor(ma)}-200 opacity-50 rounded-full`}></span>
                                    <span className="relative">{getColor(ma) == 'green' ? 'In progress' : 'Waiting to start'}</span>
                                </span>
                            </td>
                            <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                <Link to={RouterPathEnum.ADMINAREA + '/match/' + ma.uid}>Go</Link>
                            </td>
                            </tr>
                            )}
                           
                        </tbody>
                    </table>
                           </div>
                        </Widget>
                    </div>
                </div>
            </div> 

                    </div>
                    <div className="w-1/6 p-2 text-center">
                    </div>
                </div>
                </div>
         </div>
    );
}

export default Match;