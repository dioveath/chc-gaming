import { FcLandscape } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import {
  GiOrganigram,
  GiCastle
} from 'react-icons/gi';

export const MenuItems = [
  {
    'name': 'Dashboard',
    'icon': <MdDashboard/>,
  },
  {
    'name': 'Friends',
    'icon': <FaUserFriends/>
  },
  {
    'name': 'Clans',
    'icon': <GiCastle/>
  },
  {
    'name': 'Explore',
    'icon': <FcLandscape/>
  },
  {
    'name': 'Organizer Suite',
    'icon': <GiOrganigram/>
  }    
];
