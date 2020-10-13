import React from 'react';

function Homepage(){
return( <div>
      <div className="bg-indigo-900 md:overflow-hidden">
        <div className="px-4 py-20 md:py-4">
          <div className="md:max-w-6xl md:mx-auto">
            <div className="md:flex md:flex-wrap">
              <div className="md:w-1/2 text-center md:text-left md:pt-16">
                <h1
                  className="font-bold text-white text-2xl md:text-5xl leading-tight mb-4"
                >
                  Fun tournament betting
                </h1>
  
                <p className="text-indigo-200 md:text-xl md:pr-48">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
                  vitae corrupti asperiores veritatis dolorum, commodi aperiam
                  enim.
                </p>
  
                <a
                  href="#"
                  className="mt-6 mb-12 md:mb-0 md:mt-10 inline-block py-3 px-8 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow"
                  >How it works</a
                >
              </div>
              <div className="md:w-1/2 relative">
                <div className="hidden md:block">
                  <div
                    className="-ml-24 -mb-40 absolute left-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-6 py-8"
                    style={{transform: "rotate(-8deg);"}}
                  >
                    <div
                      className="bg-indigo-800 mx-auto rounded-lg px-2 pb-2 relative mb-8"
                    >
                      <div className="mb-1">
                        <span
                          className="w-1 h-1 bg-indigo-100 rounded-full inline-block"
                          style={{marginRight: "1px;"}}
                        ></span
                        ><span
                          className="w-1 h-1 bg-indigo-100 rounded-full inline-block"
                          style={{marginRight: "1px;"}}
                        ></span
                        ><span
                          className="w-1 h-1 bg-indigo-100 rounded-full inline-block"
                        ></span>
                      </div>
                      <div className="h-1 w-12 bg-indigo-100 rounded mb-1"></div>
                      <div className="h-1 w-10 bg-indigo-100 rounded mb-2"></div>
  
                      <div className="flex">
                        <div className="w-6 h-3 rounded bg-indigo-100 mr-1"></div>
                        <div className="w-6 h-3 rounded bg-indigo-100"></div>
                      </div>
  
                      <div
                        className="-mr-2 -mb-4 absolute bottom-0 right-0 h-16 w-10 rounded-lg bg-green-700 border-2 border-white"
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-green-800 mx-auto absolute bottom-0 right-0 mr-2 -mb-2 z-10 border-2 border-white"
                      ></div>
                    </div>
  
                    <div className="text-gray-800 text-center">
                      Online <br />Services
                    </div>
                  </div>
  
                  <div
                    className="ml-24 mb-16 absolute left-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-6 py-8"
                    style={{transform: "rotate(-8deg); z-index: 2;"}}
                  >
                    <div
                      className="bg-indigo-800 mx-auto rounded-lg relative mb-8 py-2 w-20 border-2 border-white"
                    >
                      <div
                        className="h-8 bg-green-700 w-8 rounded absolute left-0 top-0 -mt-3 ml-4"
                        style={{transform: "transform: rotate(-45deg); z-index: -1;"}}
                      ></div>
                      <div
                        className="h-8 bg-green-800 w-8 rounded absolute left-0 top-0 -mt-3 ml-8"
                        style={{transform: "transform: rotate(-12deg); z-index: -2;"}}
                      ></div>
  
                      <div
                        className="flex items-center justify-center h-6 bg-indigo-800 w-6 rounded-l-lg ml-auto border-4 border-white -mr-1"
                      >
                        <div
                          className="h-2 w-2 rounded-full bg-indigo-800 border-2 border-white"
                        ></div>
                      </div>
  
                      <div
                        className="w-8 h-8 bg-green-700 border-4 border-white rounded-full -ml-3 -mb-5"
                      ></div>
                    </div>
  
                    <div className="text-gray-800 text-center">
                      Banking Services
                    </div>
                  </div>
  
                  <div
                    className="ml-32 absolute left-0 bottom-0 w-48 bg-white rounded-lg shadow-lg px-10 py-8"
                    style={{transform: "transform: rotate(-8deg); z-index: 2; margin-bottom: -220px;"}}
                  >
                    <div
                      className="bg-indigo-800 mx-auto rounded-lg pt-4 mb-16 relative"
                    >
                      <div className="h-4 bg-white"></div>
  
                      <div className="text-right my-2 pb-1">
                        <div
                          className="inline-flex w-3 h-3 rounded-full bg-white -mr-2"
                        ></div>
                        <div
                          className="inline-flex w-3 h-3 rounded-full bg-indigo-800 border-2 border-white mr-2"
                        ></div>
                      </div>
  
                      <div
                        className="-ml-4 -mb-6 absolute left-0 bottom-0 w-16 bg-green-700 mx-auto rounded-lg pb-2 pt-3"
                      >
                        <div className="h-2 bg-white mb-2"></div>
                        <div className="h-2 bg-white w-6 ml-auto rounded mr-2"></div>
                      </div>
                    </div>
  
                    <div className="text-gray-800 text-center">
                      Payment for <br />Internet
                    </div>
                  </div>
  
                  <div
                    className="mt-10 w-full absolute right-0 top-0 flex rounded-lg bg-white overflow-hidden shadow-lg"
                    style={{transform: "transform: rotate(-8deg); margin-right: -250px; z-index: 1;"}}
                  >
                    <div className="w-32 bg-gray-200" style={{height: "560px;"}}></div>
                    <div className="flex-1 p-6">
                      <h2 className="text-lg text-gray-700 font-bold mb-3">
                        Leaderboard
                      </h2>
                      <div className="flex mb-5">
                        <div className="w-16 rounded-full bg-gray-100 py-2 px-4 mr-2">
                          <div className="p-1 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="w-16 rounded-full bg-gray-100 py-2 px-4 mr-2">
                          <div className="p-1 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="w-16 rounded-full bg-gray-100 py-2 px-4 mr-2">
                          <div className="p-1 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="w-16 rounded-full bg-gray-100 py-2 px-4">
                          <div className="p-1 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
  
                      <div className="flex flex-wrap -mx-4 mb-5">
                        <div className="w-1/3 px-4">
                          <div className="h-40 rounded-lg bg-white shadow-lg p-6">
                            <div
                              className="w-16 h-16 rounded-full bg-gray-200 mb-6"
                            ></div>
                            <div
                              className="h-2 w-16 bg-gray-200 mb-2 rounded-full"
                            ></div>
                            <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                        <div className="w-1/3 px-4">
                          <div className="h-40 rounded-lg bg-white shadow-lg p-6">
                            <div
                              className="w-16 h-16 rounded-full bg-gray-200 mb-6"
                            ></div>
                            <div
                              className="h-2 w-16 bg-gray-200 mb-2 rounded-full"
                            ></div>
                            <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                        <div className="w-1/3 px-4">
                          <div className="h-40 rounded-lg bg-white shadow-lg p-6">
                            <div
                              className="w-16 h-16 rounded-full bg-gray-200 mb-6"
                            ></div>
                            <div
                              className="h-2 w-16 bg-gray-200 mb-2 rounded-full"
                            ></div>
                            <div className="h-2 w-10 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                      </div>
  
                      <div
                        className="w-full flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                      >
                        <div className="w-1/3">
                          <div className="flex">
                            <div className="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                            <div>
                              <div
                                className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                              ></div>
                              <div
                                className="h-2 w-10 bg-gray-100 rounded-full"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div
                            className="w-16 rounded-full bg-green-100 py-2 px-4 mx-auto"
                          >
                            <div className="p-1 rounded-full bg-green-200"></div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div
                            className="h-2 w-10 bg-gray-100 rounded-full mx-auto"
                          ></div>
                        </div>
                      </div>
  
                      <div
                        className="flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                      >
                        <div className="w-1/3">
                          <div className="flex">
                            <div className="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                            <div>
                              <div
                                className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                              ></div>
                              <div
                                className="h-2 w-10 bg-gray-100 rounded-full"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div
                            className="w-16 rounded-full bg-orange-100 py-2 px-4 mx-auto"
                          >
                            <div className="p-1 rounded-full bg-orange-200"></div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div
                            className="h-2 w-16 bg-gray-100 rounded-full mx-auto"
                          ></div>
                        </div>
                      </div>
  
                      <div
                        className="flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                      >
                        <div className="w-1/3">
                          <div className="flex">
                            <div className="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                            <div>
                              <div
                                className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                              ></div>
                              <div
                                className="h-2 w-10 bg-gray-100 rounded-full"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div
                            className="w-16 rounded-full bg-blue-100 py-2 px-4 mx-auto"
                          >
                            <div className="p-1 rounded-full bg-blue-200"></div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div
                            className="h-2 w-8 bg-gray-100 rounded-full mx-auto"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div
                    className="w-full absolute left-0 bottom-0 ml-1"
                    style={{transform: "transform: rotate(-8deg); z-index: 1; margin-bottom: -360px;"}}
                  >
                    <div className="grid--gray h-48 w-48"></div>
                  </div>
                </div>
  
                <div
                  className="md:hidden w-full absolute right-0 top-0 flex rounded-lg bg-white overflow-hidden shadow"
                >
                  <div
                    className="h-4 bg-gray-200 absolute top-0 left-0 right-0 rounded-t-lg flex items-center"
                  >
                    <span
                      className="h-2 w-2 rounded-full bg-red-500 inline-block mr-1 ml-2"
                    ></span>
                    <span
                      className="h-2 w-2 rounded-full bg-orange-400 inline-block mr-1"
                    ></span>
                    <span
                      className="h-2 w-2 rounded-full bg-green-500 inline-block mr-1"
                    ></span>
                  </div>
                  <div className="w-32 bg-gray-100 px-2 py-8" style={{height: "340px;"}}>
                    <div className="h-2 w-16 bg-gray-300 rounded-full mb-4"></div>
                    <div className="flex items-center mb-4">
                      <div
                        className="h-5 w-5 rounded-full bg-gray-300 mr-3 flex-shrink-0"
                      ></div>
                      <div>
                        <div className="h-2 w-10 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
  
                    <div className="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-10 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-20 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-6 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-10 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-20 bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-2 w-6 bg-gray-200 rounded-full mb-2"></div>
                  </div>
                  <div className="flex-1 px-4 py-8">
                    <h2 className="text-xs text-gray-700 font-bold mb-1">
                      Popular Payments
                    </h2>
                    <div className="flex mb-5">
                      <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
                      <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
                      <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
                      <div className="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
                    </div>
  
                    <div className="flex flex-wrap -mx-2 mb-5">
                      <div className="w-1/3 px-2">
                        <div className="p-3 rounded-lg bg-white shadow">
                          <div
                            className="w-6 h-6 rounded-full bg-gray-200 mb-2"
                          ></div>
                          <div
                            className="h-2 w-10 bg-gray-200 mb-1 rounded-full"
                          ></div>
                          <div className="h-2 w-6 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-1/3 px-2">
                        <div className="p-3 rounded-lg bg-white shadow">
                          <div
                            className="w-6 h-6 rounded-full bg-gray-200 mb-2"
                          ></div>
                          <div
                            className="h-2 w-10 bg-gray-200 mb-1 rounded-full"
                          ></div>
                          <div className="h-2 w-6 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-1/3 px-2">
                        <div className="p-3 rounded-lg bg-white shadow">
                          <div
                            className="w-6 h-6 rounded-full bg-gray-200 mb-2"
                          ></div>
                          <div
                            className="h-2 w-10 bg-gray-200 mb-1 rounded-full"
                          ></div>
                          <div className="h-2 w-6 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    </div>
  
                    <h2 className="text-xs text-gray-700 font-bold mb-1">
                      Popular Payments
                    </h2>
  
                    <div
                      className="w-full flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3"
                    >
                      <div className="w-1/3">
                        <div className="flex">
                          <div
                            className="h-5 w-5 rounded-full bg-gray-200 mr-3 flex-shrink-0"
                          ></div>
                          <div>
                            <div
                              className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                            ></div>
                            <div className="h-2 w-10 bg-gray-100 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div
                          className="w-16 rounded-full bg-green-100 py-2 px-4 mx-auto"
                        >
                          <div className="p-1 rounded-full bg-green-200"></div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div
                          className="h-2 w-10 bg-gray-100 rounded-full mx-auto"
                        ></div>
                      </div>
                    </div>
  
                    <div className="flex flex-wrap justify-between items-center py-3">
                      <div className="w-1/3">
                        <div className="flex">
                          <div
                            className="h-5 w-5 rounded-full bg-gray-200 mr-3 flex-shrink-0"
                          ></div>
                          <div>
                            <div
                              className="h-2 w-16 bg-gray-200 mb-1 rounded-full"
                            ></div>
                            <div className="h-2 w-10 bg-gray-100 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div
                          className="w-16 rounded-full bg-orange-100 py-2 px-4 mx-auto"
                        >
                          <div className="p-1 rounded-full bg-orange-200"></div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div
                          className="h-2 w-16 bg-gray-100 rounded-full mx-auto"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div
                  className="mr-3 md:hidden absolute right-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-10 py-6"
                  style={{zIndex: 2, marginBottom: "-380px;"}}
                >
                  <div
                    className="bg-indigo-800 mx-auto rounded-lg w-20 pt-3 mb-12 relative"
                  >
                    <div className="h-3 bg-white"></div>
  
                    <div className="text-right my-2">
                      <div
                        className="inline-flex w-3 h-3 rounded-full bg-white -mr-2"
                      ></div>
                      <div
                        className="inline-flex w-3 h-3 rounded-full bg-indigo-800 border-2 border-white mr-2"
                      ></div>
                    </div>
  
                    <div
                      className="-ml-4 -mb-6 absolute left-0 bottom-0 w-16 bg-green-700 mx-auto rounded-lg pb-2 pt-3"
                    >
                      <div className="h-2 bg-white mb-2"></div>
                      <div className="h-2 bg-white w-6 ml-auto rounded mr-2"></div>
                    </div>
                  </div>
  
                  <div className="text-gray-800 text-center text-sm">
                    Payment for <br />Internet
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg
          className="fill-current text-white hidden md:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 10"
        >
          <path fill-opacity="1" d="M0,224L1440,32L1440,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="md:mx-auto pt-8">
        <div  className="md:max-w-6xl md:mx-auto ">
            <div className="md:flex md:flex-wrap border-b border-gray-300 pb-2 ">
            <div className="md:w-1/2 border-l-4 border-gray-400"><p className="pl-1">Age of Empires II: Definitive Edition</p></div>
            <div className="md:w-1/2 text-right">
                <span className="rounded-full bg-green-300 uppercase px-2 py-1 text-xs font-bold">Live</span>
            </div>
            </div> 
        </div>
        <div  className="md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between pt-5 pl-8">
        <div className="text-purple-600 font-bold">King of the desert 3. Hosted by <a href="#" className="text-blue-600">MembTV</a></div>
            </div>
        <div  className="md:max-w-full md:mx-auto md:flex md:items-center">
            <table className="table-auto md:mx-auto md:w-2/5">
            <thead>
                <tr>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Game #1</th>
                <th className="px-4 py-2">Game #2</th>
                <th className="px-4 py-2">Game #3</th>
                <th className="px-4 py-2">Game #4</th>
                <th className="px-4 py-2">Game #5</th>
                <th className="px-4 py-2">Odds</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="border px-4 py-2">TheViper</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">+250</td>
                </tr>
                <tr className="bg-gray-100">
                <td className="border px-4 py-2">Hera</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">0</td>
                <td className="border px-4 py-2">+220</td>
                </tr>
            </tbody>
    </table>
    </div>
        <div  className="md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between pt-5 pl-8">
        <div className="text-purple-600 font-bold">Bo5 Showmatch Mr.Yo vs Liereyy</div>
            </div>
        <div  className="md:max-w-full md:mx-auto md:flex md:items-center">
          <table className="table-auto md:mx-auto md:w-2/5">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Game #1</th>
              <th className="px-4 py-2">Game #2</th>
              <th className="px-4 py-2">Game #3</th>
              <th className="px-4 py-2">Game #4</th>
              <th className="px-4 py-2">Game #5</th>
              <th className="px-4 py-2">Odds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Mr.Yo</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">+250</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2">Liereyy</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">0</td>
              <td className="border px-4 py-2">+220</td>
            </tr>
          </tbody>
  </table>
</div>
    </div>
  </div>

);
}

export default Homepage;