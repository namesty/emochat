import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AuthServiceFactory } from '../infrastructure/auth-service-factory';

interface Props extends Omit<RouteProps, "component">{
  component: React.ReactType
}

export const ProtectedRoute: React.SFC<Props> = ({ component: Component, ...rest }) => {

  const authService = AuthServiceFactory.build()

  return (
      <Route
          {...rest}
          render={props =>
              authService.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
          }
      />
  );
}