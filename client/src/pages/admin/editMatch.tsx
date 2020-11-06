import React from 'react';
import AdminMenu from '../../components/adminMenu';
import Widget from '../../components/widget';
import useFetch from '../../hooks/useFetch';
import CreateMatch from './createMatch';

export default function EditMatch({match}: any){
    const res = useFetch('http://localhost:4000/match/' + match.params.uid, {});
    if (!res.response) {
        return <div>Loading...</div>
    }

    const matchForm = res.response;
    const error = res.error;

    console.log(matchForm);
  
    return(
        <div className="w-full mx-auto pt-10">
        <div className="p-4">
            <div className="flex mb-4">
                <div className="w-1/6 p-2 text-center"></div>
                <div className="w-1/4 p-2 text-center">
                    <AdminMenu></AdminMenu>
                </div>
                <div className="w-5/6 p-2 text-center">
               {/* <Widget title="Edit Match">
                     <p>Edit match</p>
              </Widget> */}
              <CreateMatch match={matchForm}></CreateMatch>
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