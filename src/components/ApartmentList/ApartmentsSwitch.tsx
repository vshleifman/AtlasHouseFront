import ApartmentPage from 'components/Booking/ApartmentPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { propertySelector } from 'selectors/selectors';
import Apartments from './Apartments';
import { setPropertiesThunk } from './PropertyThunks';
import FilterProvider from './FilterProvider';
import BookingProvider from 'components/Booking/BookingProvider';

const ApartmentsSwitch = ({ reference }: { reference: React.MutableRefObject<null> }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPropertiesThunk());
  }, [dispatch]);

  const apartments = useSelector(propertySelector).properties;

  const { path } = useRouteMatch();
  console.log({ apartments });

  const routes = apartments?.map(aprtm => (
    <Route path={`/apartments/${aprtm.codeID}`} key={aprtm.codeID} component={ApartmentPage} />
  ));

  return (
    <div ref={reference}>
      <FilterProvider>
        <Switch>
          <Route exact path={path} component={Apartments} />
          <BookingProvider>{routes}</BookingProvider>
        </Switch>
      </FilterProvider>
    </div>
  );
};

export default ApartmentsSwitch;
