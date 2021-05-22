// Using atomic operators/counters(may not be totally reliable, but this application may tolerate some error margin)
// https://dynamoosejs.com/guide/Model/#modelupdatekey-updateobj-settings-callback
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#WorkingWithItems.AtomicCounters
// https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.04

import Musics from '../models/Musics';

// TODO: separate into multiple files with index export file

// Composite keys templates
const musicKey = 'music_{key}';
const listGenres = 'list_genres';
const infoRegion = 'info_{region}';
const releaseTimestamp = 'release_{timestamp}'; // sk for info_{region}

// keys normalizer for dynamodb
const normalizeKey = (docKey) => docKey.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase();

export const registerMusic = async (docKey, data) => {
  const key = musicKey.replace('{key}', normalizeKey(docKey));

  const imageCreated = await Musics.create(
    {
      type_key: key,
      sk: key,
      data,
    },
    {
      overwrite: true, // overrite existent keys
    },
  );

  return imageCreated;
};

export const getMusic = async (docKey) => {
  const key = musicKey.replace('{key}', normalizeKey(docKey));

  const musicFound = await Musics.get({ type_key: key, sk: key });

  return musicFound;
};

export const registerGenre = async (genre) => {
  await Musics.update({ type_key: listGenres, sk: listGenres }, { $ADD: { genres: [genre] } });

  return true;
};

export const getGenres = async () => {
  const listGenresFound = await Musics.get({ type_key: listGenres, sk: listGenres });

  return listGenresFound;
};

export const initGenres = async () => {
  const listGenresFound = await Musics.get({ type_key: listGenres, sk: listGenres });

  // initialize list_genres if not present on the table(may run only once)
  if (!listGenresFound) {
    await Musics.create({ type_key: listGenres, sk: listGenres, genres: [] });
    const createdListGenresFound = await Musics.get({ type_key: listGenres, sk: listGenres });
    return createdListGenresFound;
  }

  return listGenresFound;
};

export const updateRegionCount = async (region) => {
  const key = infoRegion.replace('{region}', region);

  const updatedRegionCount = await Musics.update({ type_key: key, sk: key }, { $ADD: { count: 1 } });

  return updatedRegionCount;
};

export const getRegionInfo = async (region) => {
  const key = infoRegion.replace('{region}', region);

  const regionFound = await Musics.get({ type_key: key, sk: key });

  return regionFound;
};

export const initRegionInfo = async (region, music) => {
  const key = infoRegion.replace('{region}', region);
  const releaseKey = releaseTimestamp.replace('{timestamp}', music.data.release);

  const regionFound = await Musics.get({ type_key: key, sk: key });

  // initialize info_{region} / info_{region} if not present on the table(may run only few times)
  if (!regionFound) {
    await Musics.create({ type_key: key, sk: key, count: 0 }); // initialize info_{region} / info_{region}
    await Musics.create({ type_key: key, sk: releaseKey, ref: music }); // initialize a info_{region} / release_{timestamp}
    const createdRegionFound = await Musics.get({ type_key: key, sk: key });
    return createdRegionFound;
  }

  return regionFound;
};

// register new music release every time a newer/older is found
export const registerRegionRelease = async (region, release, music) => {
  const key = infoRegion.replace('{region}', region);
  const releaseKey = releaseTimestamp.replace('{timestamp}', `${release}`.padStart(15, '0'));

  await Musics.create({ type_key: key, sk: releaseKey, ref: music });

  return true;
};

export const getOldestRegionMusic = async (region) => {
  const key = infoRegion.replace('{region}', region);

  const regionDescending = await Musics.query('type_key').eq(key).sort('descending').limit(2).exec();
  const regionRelease = regionDescending.find((item) => item.sk.includes('release'));
  if (!regionRelease) return regionRelease;
  const timestamp = regionRelease.sk.replace('release_', '');
  regionRelease.sk = parseInt(timestamp, 10);

  return regionRelease.populate();
};

export const getNewestRegionMusic = async (region) => {
  const key = infoRegion.replace('{region}', region);

  const regionAscending = await Musics.query('type_key').eq(key).sort('ascending').limit(2).exec();
  const regionRelease = regionAscending.find((item) => item.sk.includes('release'));
  if (!regionRelease) return regionRelease;
  const timestamp = regionRelease.sk.replace('release_', '');
  regionRelease.sk = parseInt(timestamp, 10);

  return regionRelease.populate();
};
