import { FcLandscape } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import {
  GiOrganigram,
} from 'react-icons/gi';

import DashboardHome from './DashboardHome';
import Tourneys from './Tourneys';
import { NotFound } from '../NotFoundPage/NotFound.js';
import TournamentCreatePage from './Tourneys/TourneyCreatePage.js';

export const MenuItems = [
  {
    'name': 'Dashboard',
    'icon': <MdDashboard/>,
    'content': <DashboardHome/>
  },
  {
    'name': 'Notifications',
    'icon': <FaUserFriends/>,
    'content': <TournamentCreatePage/>
  },
  {
    'name': 'Tournaments',
    'icon': <GiOrganigram/>,
    'content': <Tourneys/>
  },
  {
    'name': 'Explore',
    'icon': <FcLandscape/>,
    'content': <NotFound/>
  }
];
