import React from 'react';

export default function Widget(props: any){
    console.log(props)
    return(
        <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
            <div className="border-b p-3">
                <h5 className="font-bold uppercase text-blue-600">{props.title}</h5>
            </div>
            <div className="p-5">
                <div className="flex">
                   {props.children}
                </div>
            </div>
    </div>
    );
}