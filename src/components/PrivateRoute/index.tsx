import React from "react"
import { Route, Redirect, RouteComponentProps } from "react-router-dom"
import { isAuthenticated } from "../../utils/auth"

interface Props {
  component:  React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  path: string
  exact: boolean
}

export const PrivateRoute: React.FC<Props> = ({component, path, exact}) => {
  if(isAuthenticated()) {
    return <Route path={path} exact={exact} component={component}/>
  } else {
    return <Redirect to="/login"/>
  }
}
