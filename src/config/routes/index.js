import React from 'react'
import { BrowserRouter as Route, Router, Switch } from 'react-router-dom'
import LandingPages from '../../pages/LandingPage/LandingPages'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LandingPages />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes;