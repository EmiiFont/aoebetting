import React from 'react'
import {Link} from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';

function Header(){
    return(
        <div className="bg-indigo-900 px-4 py-4">
        <div
          className="md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between"
        >
          <div className="flex justify-between items-center">
            <a href="#" className="inline-block py-2 text-white text-xl font-bold"
              >AOE BETTING</a
            >
            <div
              className="inline-block cursor-pointer md:hidden">
              <div className="bg-gray-400 w-8 mb-2" style={{height: "2px;"}}></div>
              <div className="bg-gray-400 w-8 mb-2" style={{height: "2px;"}}></div>
              <div className="bg-gray-400 w-8" style={{height: "2px;"}}></div>
            </div>
          </div>
          
          <div>
                {/* <Link to={RouterPathEnum.HOME}>Home</Link>
         <Link to={RouterPathEnum.MATCH}>Match</Link> */}
            <div className="hidden md:block">
            <Link to={RouterPathEnum.HOME} 
                className="inline-block py-1 md:py-4 text-gray-100 mr-6 font-bold"
                >Home</Link>
              <a                   href="#"
                className="inline-block py-1 md:py-4 text-gray-500 mr-6"
                >Games</a
              >
              <a
                href="#"
                className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6"
                >InPlay</a
              >
              <a
                href="#"
                className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6"
                >Leaderboard</a
              >
              <a
                href="#"
                className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100"
                >Promotions</a
              >
            </div>
          </div>
          <div className="hidden md:block">
            <Link to={RouterPathEnum.LOGIN}
              className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6"
              >Login</Link>
            <a
              href="#"
              className="inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg"
              >Sign Up</a
            >
          </div>
        </div>
      </div>
    )
}

export default Header;