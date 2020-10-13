import React from 'react';
import {Route, Switch} from 'react-router-dom'
import HomePage from '../pages/homepage';
import Login from '../pages/login';
import Leaderboard from '../pages/leaderboard';
import MatchList from '../components/match/match';
import MatchDetail from '../components/match/matchDetail';
import { RouterPathEnum } from '../enums/RouterPathEnum';

export default function Routes() {
    return (
      <Switch>
        <Route exact path={RouterPathEnum.HOME} component={HomePage}></Route>
         <Route exact path={RouterPathEnum.MATCH} component={MatchList}></Route>
         <Route exact path={RouterPathEnum.MATCH +  '/:uid'} component={MatchDetail}></Route>
         <Route exact path={RouterPathEnum.LOGIN} component={Login}></Route>
         <Route exact path={RouterPathEnum.LEADERBOARD} component={Leaderboard}></Route>
      </Switch>
    );
  }
  