import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../screens/app';
import TeamsList from '../screens/teams/list';
import UsersList from '../screens/users/list';
import MoodsList from '../screens/moods/list';

export default () => (
  <Route component={ App }>
    <IndexRoute component={ TeamsList } />
    <Route component={ UsersList } path="/users/" />
    <Route component={ MoodsList } path="/teams/:id/moods" />
  </Route>
);
