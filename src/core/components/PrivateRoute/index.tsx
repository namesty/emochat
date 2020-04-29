import React from "react"
import { Route, Redirect, RouteComponentProps } from "react-router-dom"
import { AuthService } from "../../../features/auth/domain/auth-service"

interface Props {
  component:  React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  path: string
  exact: boolean
  authSerivce: AuthService
}

export const PrivateRoute: React.FC<Props> = ({component, path, exact, authSerivce}) => {
  if(authSerivce.isAuthenticated()) {
    return <Route path={path} exact={exact} component={component}/>
  } else {
    return <Redirect to="/login"/>
  }
}
