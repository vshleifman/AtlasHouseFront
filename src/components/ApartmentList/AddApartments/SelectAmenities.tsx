import Select from 'react-select';
import { amenitiesList, Apartment } from 'types/types';

const SelectAmenities = ({ apartment, onChange }: { apartment?: Apartment; onChange: (amens: any) => void }) => {
  const amenitiesArr = [
    'balcony',
    'bathtub',
    'shower',
    'wifi',
    'tv',
    'cutlery',
    'microwave',
    'oven',
    'kettle',
    'cooker',
    'fridge',
    'washingMachine',
    'iron',
    'ironingBoard',
    'linen',
    'towels',
  ];

  let defaultAmenities: Record<string, boolean> = {};
  amenitiesArr.forEach(amen => {
    defaultAmenities[amen] = false;
  });

  const amenitiesOptions = amenitiesArr.map(amenity => {
    return {
      value: amenity,
      label: amenity[0].toUpperCase() + amenity.slice(1),
    };
  });

  const preselectedAmenities: typeof amenitiesOptions = [];

  if (apartment?.amenities) {
    amenitiesOptions.forEach(option => {
      if (apartment?.amenities[option.value as keyof amenitiesList] === true) {
        preselectedAmenities.push(option);
      }
    });
  }

  return (
    <Select
      tw="max-width[min-content]"
      defaultValue={preselectedAmenities}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
      options={amenitiesOptions}
      onChange={options => {
        const tempAmenities = { ...defaultAmenities };
        options.forEach(option => (tempAmenities[option.value as keyof typeof defaultAmenities] = true));
        onChange(tempAmenities);
      }}
    />
  );
};

export default SelectAmenities;
