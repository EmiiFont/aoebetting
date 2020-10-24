import React from 'react'

function MatchInformation(props: any){

    return(
        <>
         <div className="w-1/2 px-2">
                <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                    <div className="border-b p-3">
                        <h5 className="font-bold uppercase text-blue-600">{props.title}</h5>
                    </div>
                    <div className="p-5">
                    
                    </div>
                </div>

         </div>
        </>
    )
}

export default MatchInformation;