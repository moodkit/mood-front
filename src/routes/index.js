import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../screens/app';
import TeamsList from '../screens/teams/list';
import UsersList from '../screens/users/list';
import MoodsList from '../screens/moods/list';
import UsersMood from '../screens/users/mood';

export default () => (
  <Route component={ App }>
    <IndexRoute component={ TeamsList } />
    <Route component={ TeamsList } path="/teams/" />
    <Route component={ MoodsList } path="/teams/:id/moods" />
    <Route component={ UsersMood } path="/users/:user_id/moods" />
  </Route>
);
