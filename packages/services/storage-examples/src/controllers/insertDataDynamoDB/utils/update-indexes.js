//
// Below code could be implemented with stream events on Image table
//

import * as musicsDao from '../../../common/database/dao/musics-dao';

export default async (music) => {
  // check to update genres list
  const genresListFound = await musicsDao.getGenres() ?? await musicsDao.initGenres();
  if (!genresListFound.genres.includes(music.data.genre)) await musicsDao.registerGenre(music.data.genre);

  // update region musics count
  const regionInfoFound = await musicsDao.getRegionInfo(music.data.region) ?? await musicsDao.initRegionInfo(music.data.region, music);
  if (!regionInfoFound) await musicsDao.initRegionInfo(music.data.region, music);
  await musicsDao.updateRegionCount(music.data.region);

  // check to update oldest/newest music by region
  const newestMusic = await musicsDao.getNewestRegionMusic(music.data.region);
  const oldestMusic = await musicsDao.getOldestRegionMusic(music.data.region);
  const isOlder = music.data.release > oldestMusic.sk;
  const isNewer = music.data.release < newestMusic.sk;
  if (isOlder || isNewer) await musicsDao.registerRegionRelease(music.data.region, music.data.release, music);

  return true;
};
