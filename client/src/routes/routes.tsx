import React from 'react';
import {Route, Switch} from 'react-router-dom'
import HomePage from '../pages/homepage';
import Login from '../pages/login';
import Leaderboard from '../pages/leaderboard';
import Admin from '../pages/admin';
// import MatchList from '../components/match/match';
// import MatchDetail from '../components/match/matchDetail';
import { RouterPathEnum } from '../enums/RouterPathEnum';
import Player from '../pages/admin/player';
import EditMatch from '../pages/admin/editMatch';

export default function Routes() {
    return (
      <Switch>
        <Route exact path={RouterPathEnum.HOME} component={HomePage}></Route>
         {/* <Route exact path={RouterPathEnum.MATCH} component={MatchList}></Route>
         <Route exact path={RouterPathEnum.MATCH +  '/:uid'} component={MatchDetail}></Route> */}
         <Route exact path={RouterPathEnum.LOGIN} component={Login}></Route>
         <Route exact path={RouterPathEnum.LEADERBOARD} component={Leaderboard}></Route>
         <Route exact path={RouterPathEnum.ADMINAREA} component={Admin}></Route>
         <Route exact path={RouterPathEnum.ADMINAREA + '/match'} component={Admin}></Route>
         <Route exact path={RouterPathEnum.ADMINAREA + '/player'} component={Player}></Route>
         <Route exact path={RouterPathEnum.ADMINAREA + '/match' + '/:uid'} component={EditMatch}></Route>
      </Switch>
    );
  }
  