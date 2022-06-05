import { Redirect }  from 'react-router-dom';
import { FcLandscape } from 'react-icons/fc';
import { RiSettings5Fill } from 'react-icons/ri';
import { IoGameController } from 'react-icons/io5';
import { MdDashboard, MdAppRegistration, MdLeaderboard } from 'react-icons/md';
import {
  GiOrganigram,
  GiCheckboxTree
} from 'react-icons/gi';
import { VscListTree } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';

import { NotFound } from '../NotFoundPage/NotFound.js';
import OverviewPage from './Overview';
import SettingsPage from './Settings';
import Participants from './Participants';
import Registrations from './Registrations';
import Structure from './Structure';
import Placements from './Placements';

export const MenuItems = [
  {
    'name': 'Overview',
    'icon': <MdDashboard/>,
    'content': <OverviewPage/>
  },
  {
    'name': 'Settings',
    'icon': <RiSettings5Fill/>,
    'content': <SettingsPage/>
  },
  {
    'name': 'Structure',
    'icon': <GiOrganigram/>,
    'content': <Structure/>
  },
  {
    'name': 'Registrations',
    'icon': <MdAppRegistration/>,
    'content': <Registrations/>
  },
  {
    'name': 'Participants',
    'icon': <IoGameController/>,
    'content': <Participants/>
  },
  {
    'name': 'Placements',
    'icon': <VscListTree/>,
    'content': <Placements/>
  },
  {
    'name': 'Matches',
    'icon': <GiCheckboxTree/>,
    'content': <NotFound/>
  },
  {
    'name': 'Final Standings',
    'icon': <MdLeaderboard/>,
    'content': <NotFound/>
  },
  {
    'name': 'Share',
    'icon': <AiOutlineShareAlt/>,
    'content': <NotFound/>
  },

  {
    'name': 'Organizer Dashboard',
    'icon': <MdDashboard/>,
    'content': <Redirect to='/organizer'/>
  }
];
