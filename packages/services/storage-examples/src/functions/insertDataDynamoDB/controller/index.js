import { } from '@sls/lib';
import registerMusic from './utils/register-music';
import updateIndexes from './utils/update-indexes';
import bundleData from './utils/bundle-data';

export default async (params) => {
  // new music registry
  const newMusic = await registerMusic(params);

  // update indexes for efficient query
  await updateIndexes(newMusic);

  // query data for demonstration
  const data = await bundleData();

  return data;
};
