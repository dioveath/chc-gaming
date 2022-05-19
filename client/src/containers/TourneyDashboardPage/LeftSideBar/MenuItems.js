import { FcLandscape } from 'react-icons/fc';
import { RiSettings5Fill } from 'react-icons/ri';
import { MdDashboard, MdAppRegistration } from 'react-icons/md';
import {
  GiOrganigram,
} from 'react-icons/gi';

import { NotFound } from '../../NotFoundPage/NotFound.js';
import OverviewPage from './../Overview';

export const MenuItems = [
  {
    'name': 'Overview',
    'icon': <MdDashboard/>,
    'content': <OverviewPage/>
  },
  {
    'name': 'Settings',
    'icon': <RiSettings5Fill/>,
    'content': <NotFound/>
  },
  {
    'name': 'Structure',
    'icon': <GiOrganigram/>,
    'content': <NotFound/>
  },
  {
    'name': 'Registrations',
    'icon': <MdAppRegistration/>,
    'content': <NotFound/>
  },
  {
    'name': 'Participants',
    'icon': <FcLandscape/>,
    'content': <NotFound/>
  },
  {
    'name': 'Placements',
    'icon': <FcLandscape/>,
    'content': <NotFound/>
  },
  {
    'name': 'Matches',
    'icon': <FcLandscape/>,
    'content': <NotFound/>
  },
  {
    'name': 'Final Standings',
    'icon': <FcLandscape/>,
    'content': <NotFound/>
  },
  {
    'name': 'Share',
    'icon': <FcLandscape/>,
    'content': <NotFound/>
  },    
];
