/**
 * Screenshot registry.
 *
 * Only the frames actually referenced by `projects[].imageKeys` are imported —
 * anything else in src/assets/projects/ stays out of the bundle.
 */

import project2 from '../../assets/projects/project2.png';
import project3 from '../../assets/projects/project3.png';
import project4 from '../../assets/projects/project4.png';
import project5 from '../../assets/projects/project5.png';
import project6 from '../../assets/projects/project6.png';
import project7 from '../../assets/projects/project7.png';
import project8 from '../../assets/projects/project8.png';
import project9 from '../../assets/projects/project9.png';
import project10 from '../../assets/projects/project10.png';
import project13 from '../../assets/projects/project13.png';
import project14 from '../../assets/projects/project14.png';
import project15 from '../../assets/projects/project15.png';
import project55 from '../../assets/projects/project55.png';
import project56 from '../../assets/projects/project56.png';
import project57 from '../../assets/projects/projecct57.png';
import project58 from '../../assets/projects/project58.png';
import project59 from '../../assets/projects/project59.png';
import project66 from '../../assets/projects/project66.png';
import project67 from '../../assets/projects/project67.png';
import project68 from '../../assets/projects/project68.png';
import project69 from '../../assets/projects/project69.png';
import project77 from '../../assets/projects/project77.png';
import project78 from '../../assets/projects/project78.png';
import project79 from '../../assets/projects/project79.png';
import project699 from '../../assets/projects/project699.png';
import project789 from '../../assets/projects/project789.png';
import project799 from '../../assets/projects/project799.png';
import project7999 from '../../assets/projects/project7999.png';

import projectt11 from '../../assets/projects/projectt11.png';
import projectt22 from '../../assets/projects/projectt22.png';
import projectt25 from '../../assets/projects/projectt25.png';
import projectt26 from '../../assets/projects/projectt26.png';
import pp1 from '../../assets/projects/pp1.png';

import pp2 from '../../assets/projects/pp2.png';


export const PROJECT_ASSETS = {
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8,
  project9,
  project10,
  project13,
  project14,
  project15,
  projectt11,
  projectt22,
  projectt25,
  projectt26,
  project55,
    project56,
  project57,
    project58,
  project59,
    project66,
project67,
project68,
project69,
project78,
project77,
project79,

project699,
project789,
project799,
project7999,



};

/** Resolves a project's image keys to real sources, dropping any that are missing. */
export const resolveFrames = (imageKeys = []) =>
  imageKeys.map((key) => PROJECT_ASSETS[key]).filter(Boolean);
