import React from 'react'
import Widget from '../components/widget';

function Leaderboard(){
    return (

 <Widget title="Leaderboard">
   <div id="menu" className="container mx-auto px-4 lg:pt-24 lg:pb-64">
      <div className="flex flex-wrap text-center justify-center">
        <div className="w-full lg:w-6/12 px-4">
          <h2 className="text-4xl font-semibold text-black">Leaderboard</h2>
        </div>
      </div>
      <div className="flex flex-wrap mt-12 justify-center md:max-w-6xl md:mx-auto bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4 mt-4  mb-4">
        <div className="col-span-2 sm:col-span-1 xl:col-span-1">
          <img
            alt="..."
            src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
            className="h-24 w-24 rounded  mx-auto"
          />
        </div>
        <div className="col-span-2 sm:col-span-4 xl:col-span-4 py-6">
          <h3 className="font-semibold text-black">Nicholas</h3>
        </div>
        <div className="col-span-2 sm:col-span-1 xl:col-span-1 italic py-6">55,000</div>
 
        <div className="col-span-2 sm:col-span-1 xl:col-span-1">
          <img
            alt="..."
            src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
            className="h-24 w-24 rounded  mx-auto"
          />
        </div>
        <div className="col-span-2 sm:col-span-4 xl:col-span-4 py-6">
          <h3 className="font-semibold text-black">Carmelo</h3>
        </div>
        <div className="col-span-2 sm:col-span-1 xl:col-span-1 italic py-6">35,700</div>
 
        <div className="col-span-2 sm:col-span-1 xl:col-span-1">
          <img
            alt="..."
            src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
            className="h-24 w-24 rounded  mx-auto"
          />
        </div>
        <div className="col-span-2 sm:col-span-4 xl:col-span-4 py-6">
          <h3 className="font-semibold text-black">Jose</h3>
        </div>
        <div className="col-span-2 sm:col-span-1 xl:col-span-1 italic py-6">5,000</div>
      </div>
      </div>
    </div>
    </Widget>
    )
}

export default Leaderboard;