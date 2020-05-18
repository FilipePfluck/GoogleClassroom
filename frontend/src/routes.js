import { BrowserRouter, Route, Switch} from 'react-router-dom';
import React from 'react';

import Login from './pages/login/index.js'
import Register from './pages/register/index.js'
import Classrooms from './pages/classrooms/index.js'
import Classroom from './pages/classroom/index.js'
import People from './pages/people/index.js'
import Activity from './pages/activity/index.js'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/classrooms" exact component={Classrooms}/>
                <Route path="/classroom" exact component={Classroom}/>
                <Route path="/classroom/people" exact component={People}/>
                <Route path="/classroom/activity" exact component={Activity}/>
            </Switch>
        </BrowserRouter>
    )
};