import React from 'react';
import AdminMenu from '../adminMenu';

function Match(){
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
                            <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                                <div className="border-b p-3">
                                    <h5 className="font-bold uppercase text-blue-600">Match list</h5>
                                </div>
                                <div className="p-5">
                                <div className="flex">
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
                                    Tournament
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Competitors
                                </th>
                                <th
                                    className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                    <div className="flex items-center">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                TheViper vs Hera Bo5
                                            </p>
                                    </div>
                                </td>
                                <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                    <p className="text-gray-900 whitespace-no-wrap"> Jan 21, 2020</p>
                                </td>
                                <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                       King of the desert 3
                                    </p>
                                </td>
                                <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                       Expand...
                                    </p>
                                </td>
                                <td className="px-5 py-1 border-b border-gray-200 bg-white text-xs">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Activo</span>
                                    </span>
                                    {/* <span
                                        className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Inactive</span>
                                    </span>
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Suspended</span>
                                    </span> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                                 </div>
                                </div>
                        </div>
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