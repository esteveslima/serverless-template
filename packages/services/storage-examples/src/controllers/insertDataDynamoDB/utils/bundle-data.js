import * as musicsDao from '../../../common/database/dao/musics-dao';

export default async () => {
  const genres = await musicsDao.getGenres();

  const availableRegions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  const regionsDataList = await Promise.all(
    availableRegions.map(async (region) => ({
      newest: await musicsDao.getNewestRegionMusic(region),
      oldest: await musicsDao.getOldestRegionMusic(region),
      info: await musicsDao.getRegionInfo(region),
    })),
  );
  const regionsData = regionsDataList.reduce((acc, curr, idx) => {
    acc[availableRegions[idx]] = curr;
    return acc;
  }, {});

  return {
    genres,
    regionsData,
  };
};
