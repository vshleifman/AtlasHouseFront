import ApartmentPage from "components/ApartmentPage"
import Spinner from "components/Spinner"
import { useSelector } from "react-redux"
import { Route, Switch, useRouteMatch } from "react-router"
import { propertySelector } from "selectors/selectors"
import Apartments from "./Apartments"

const ApartmentsSwitch = () => {
    const apartments = useSelector(propertySelector).properties
    
    const {path} = useRouteMatch()

    const routes = apartments?.map(aprtm => <Route path={`${path}/${aprtm.codeID}`} key={aprtm.codeID} render={() => <ApartmentPage apartment={aprtm} />} />)
    
    return (
    <Switch>
        <Route exact path={path} component={Apartments} />
        {routes}
    </Switch>)
}

export default ApartmentsSwitch