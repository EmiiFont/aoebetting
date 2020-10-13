import React from 'react';

function Login(){
    return(
        <div>
        <div className="mx-auto container flex items-center" id="nav">
        <div className="w-full pt-2 p-4">

            <div className="mx-auto md:p-6 md:w-1/2">
                <div className="flex flex-wrap justify-between">
                    <h1 className="text-2xl text-gray-600 hover:text-orange-500 transition duration-500 p-4">
                        <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
                        Sign-in
                    </h1>
                    <a href="#home" className="mt-8 text-gray-600 hover:text-orange-600 transition duration-500">
                        <svg className=" w-6 h-6 inline-block align-bottom" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Back to Home
                        <i className="fas fa-chevron-circle-left fa-fw"></i>
                    </a>
                </div>

                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <form method="POST" action="#login">
                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                <span className="text-red-500">&nbsp;*</span>
                                username
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                <input id="username" className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 transition duration-500 ease-in-out" 
                                placeholder="you@email.com" />
                            </div>
                            <strong className="text-red-500 text-xs italic">username is required</strong>
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                <span className="text-red-500">&nbsp;*</span>
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <input name="password" id="password" type="text" className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 transition duration-500 ease-in-out"></input>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="block text-gray-500 font-bold">
                                        <input className="ml-2 leading-tight" type="checkbox" id="remember" name="remember"></input>
                                        <span className="text-sm ml-2">
                                            remember me
                                        </span>
                                    </label>
                                </div>
                                <div>
                                    <a className="font-bold text-sm text-gray-600 hover:text-orange-800" href="#password-request">
                                        forgot password
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 text-center">
                            <button className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-lg" type="submit">
                                Login
                            </button>
                        </div>
                        <hr></hr>

                        <div className="flex justify-between">
                            <div className="flex mt-8">
                                <p className="text-sm">
                                    no account? 
                                    <a className="ml-1 font-bold text-sm text-indigo-500 hover:text-indigo-800" href="#register">
                                        sign up
                                    </a>
                                </p>
                            </div>
                            <div className="flex mt-6 text-right">
                            <div className="flex rounded-t mb-0">
                        <div className="flex-none ml-3 mr-3 py-2">
                            <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6>
                            </div>
                        <div className="btn-wrapper">
                            <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button">
                                <img alt="..." className="w-5 mr-1" style={{color: "blue"}} src="https://simpleicons.org/icons/facebook.svg" /></button>
                            <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button">
                                <img alt="..." className="w-5 mr-1" src="https://laperla.tech/static/media/google.87be59a1.svg" /></button>
                                <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button">
                                <img alt="..." className="w-5 mr-1" src="https://simpleicons.org/icons/apple.svg" /></button>
                        </div>
                                 </div>
                                </div>
                        </div>
                    </form>


                </div>
                     </div>
            </div>
            </div>
         </div>
    );
}

export default Login;