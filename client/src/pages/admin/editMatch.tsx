import React from 'react';
import AdminMenu from '../../components/adminMenu';
import Widget from '../../components/widget';

export default function EditMatch(){
    return(
        <div className="w-full mx-auto pt-10">
        <div className="p-4">
            <div className="flex mb-4">
                <div className="w-1/6 p-2 text-center"></div>
                <div className="w-1/4 p-2 text-center">
                    <AdminMenu></AdminMenu>
                </div>
                <div className="w-5/6 p-2 text-center">
               <Widget title="Edit Match">
        <p>Edit match</p>
        </Widget>
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