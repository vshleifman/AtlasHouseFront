import styled from 'styled-components';
import Select, { OptionsType } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RefObject, useContext } from 'react';
import { FilterContext, initialFiltersState, FilterState } from './FilterProvider';
import { Btn } from 'styles/styles';
import { setPropertiesThunk } from './PropertyThunks';
import { userSelector } from 'selectors/selectors';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: grid;
  grid-area: filter;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'sort filter' 'btn btn';
  margin: 1em;
  gap: 1em;
`;

const sortOptions = [
  { value: 'price:desc', label: 'Price: highest first' },
  { value: 'price:asc', label: 'Price: lowest first' },
  { value: 'area:desc', label: 'Area: highest first' },
  { value: 'area:asc', label: 'Area: lowest first' },
];

const Filter = ({ reference }: { reference: RefObject<HTMLDivElement> }) => {
  const { filters, setFilters } = useContext(FilterContext);

  const dispatch = useDispatch();

  const user = useSelector(userSelector).userData;
  const isAdmin = user?.role === 2;

  const filterOptions = Object.keys(filters.amenities).map(amenity => {
    return {
      value: amenity,
      label: `${amenity.charAt(0).toUpperCase()}${amenity.slice(1)}`,
    };
  });

  const onFilterSelect = (options: OptionsType<{ value: string; label: string }>) => {
    type FilterKey = keyof FilterState['amenities'];
    const values = options.map(item => item.value) as FilterKey[];

    const tempAmenities = { ...initialFiltersState.amenities };

    values.forEach(val => {
      tempAmenities[val] = true;
    });

    setFilters({ ...filters, amenities: tempAmenities });
  };

  const onClick = (filters?: FilterState) => {
    if (filters && !filters.dateRange.to) {
      return alert('Please select an end date!');
    }
    dispatch(setPropertiesThunk(filters));
    console.log(filters);

    reference.current !== null ? reference.current.scrollIntoView() : console.log('null');
  };

  return (
    <Container ref={reference}>
      <div style={{ gridArea: 'sort' }}>
        Sort By:
        <Select
          options={sortOptions}
          onChange={e => {
            setFilters({ ...filters, sortBy: e!.value });
          }}
        />
      </div>

      <div style={{ gridArea: 'filter' }}>
        Filter:
        <Select
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          options={filterOptions}
          onChange={onFilterSelect}
        />
      </div>

      <div tw="flex grid-area[btn]">
        {isAdmin ? (
          <Btn tw="flex ">
            <Link tw="flex flex-col flex-basis[100%] min-h-full justify-center" to="/add_apartment">
              Add New Apartment
            </Link>
          </Btn>
        ) : null}

        <Btn onClick={() => onClick()}>Show All Apartments</Btn>

        <Btn style={!isAdmin ? { justifySelf: 'end' } : undefined} onClick={() => onClick(filters)}>
          Search Apartments
        </Btn>
      </div>
    </Container>
  );
};

export default Filter;
