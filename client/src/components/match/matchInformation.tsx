import React from 'react'

function MatchInformation(props: any){

    // lastUpdate:     Date;
    // match:          MatchResponse;
    // MatchIdFromApi: null;
    // Started:        null;
    // finished:       null;
    // uid:            number;
    // matchUid:       number;
    if(props.matchInformation === undefined) return (<></>)
    return(
        <>
         <div className="w-1/2 px-2">
                <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                    <div className="border-b p-3">
                        <h5 className="font-bold uppercase text-blue-600">{props.matchInformation.uid}</h5>
                    </div>
                    <div className="p-5">
                         <p>{props.matchInformation.MatchIdFromApi}</p>
                         <p>{props.matchInformation.Started}</p>
                         <p>{props.matchInformation.Finished}</p>
                         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Set winner
                                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>Team 1</option>
                            <option>Team 2</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

         </div>
        </>
    )
}

export default MatchInformation;