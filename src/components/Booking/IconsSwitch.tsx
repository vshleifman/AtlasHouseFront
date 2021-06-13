import { amenitiesList } from 'types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBath,
  faWifi,
  faShower,
  faTv,
  faUtensils,
  faWater,
  faFire,
  faMugHot,
  faSnowflake,
  faSoap,
  faBed,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export const iconsObject = {
  balcony: '',
  bathtub: 'faBath',
  shower: 'boolean',
  wifi: 'boolean',
  tv: 'boolean',
  cutlery: 'boolean',
  microwave: 'boolean',
  oven: 'boolean',
  kettle: 'boolean',
  cooker: 'boolean',
  fridge: 'boolean',
  washingMachine: 'boolean',
  iron: 'boolean',
  ironingBoard: 'boolean',
  linen: 'boolean',
  towels: 'boolean',
};

const IconsSwitch = ({ amenity }: { amenity: keyof amenitiesList }) => {
  switch (amenity) {
    case 'bathtub':
      return <FontAwesomeIcon icon={faBath} />;
    case 'wifi':
      return <FontAwesomeIcon icon={faWifi} />;
    case 'shower':
      return <FontAwesomeIcon icon={faShower} />;
    case 'tv':
      return <FontAwesomeIcon icon={faTv} />;
    case 'cutlery':
      return <FontAwesomeIcon icon={faUtensils} />;
    case 'cooker':
      return <FontAwesomeIcon icon={faFire} />;
    case 'fridge':
      return <FontAwesomeIcon icon={faSnowflake} />;
    case 'kettle':
      return <FontAwesomeIcon icon={faMugHot} />;
    case 'microwave':
      return <FontAwesomeIcon icon={faWater} />;
    case 'washingMachine':
      return <FontAwesomeIcon icon={faSoap} />;
    case 'linen':
      return <FontAwesomeIcon icon={faBed} />;

    default:
      return <FontAwesomeIcon icon={faChevronRight} />;
  }
};

export default IconsSwitch;
