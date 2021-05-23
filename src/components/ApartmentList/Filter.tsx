import Select, { OptionsType } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RefObject, useContext } from 'react';
import { FilterContext, initialFiltersState, FilterState } from './FilterProvider';
import { Btn } from 'styles/styles';
import { setPropertiesThunk } from './PropertyThunks';
import { userSelector } from 'selectors/selectors';
import { Link } from 'react-router-dom';

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

    reference.current !== null ? reference.current.scrollIntoView() : console.log('null');
  };

  return (
    <>
      <div tw="m-1 gap-1 w-30 flex flex-col items-stretch justify-center" ref={reference}>
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
          <Btn onClick={() => onClick(filters)}>Filter Apartments</Btn>

          <Btn onClick={() => onClick()}>Reset Filters</Btn>
        </div>
      </div>
      {isAdmin ? (
        <Btn tw="flex w-3 h-3 rounded-full items-center top[136%] left[77%] absolute">
          <Link tw="flex flex-col text-5xl flex-basis[100%] min-h-full justify-center" to="/add_apartment">
            +
          </Link>
        </Btn>
      ) : null}
    </>
  );
};

export default Filter;
