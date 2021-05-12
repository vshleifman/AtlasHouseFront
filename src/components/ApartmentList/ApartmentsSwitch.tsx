import ApartmentPage from 'components/ApartmentPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { propertySelector } from 'selectors/selectors';
import Apartments from './Apartments';
import { setPropertiesThunk } from './PropertyThunks';

const ApartmentsSwitch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPropertiesThunk());
  }, [dispatch]);

  const apartments = useSelector(propertySelector).properties;

  const { path } = useRouteMatch();

  const routes = apartments?.map(aprtm => (
    <Route path={`/apartments/${aprtm.codeID}`} key={aprtm.codeID} component={ApartmentPage} />
  ));

  return (
    <Switch>
      <Route exact path={path} component={Apartments} />
      {routes}
    </Switch>
  );
};

export default ApartmentsSwitch;
