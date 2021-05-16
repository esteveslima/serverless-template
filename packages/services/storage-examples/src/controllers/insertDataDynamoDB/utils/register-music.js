import * as faker from 'faker';
import * as musicsDao from '../../../common/database/dao/musics-dao';

export default async (body) => {
  const musicKey = faker.random.words(2);

  const musicData = {
    title: musicKey,
    artist: faker.name.findName(),
    genre: faker.music.genre(),
    region: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'][faker.datatype.number(4)],
    subjects: faker.random.words(5).split(' '),
    release: new Date(faker.date.past(50)),
    duration: faker.datatype.number(600),
    id: faker.datatype.uuid(), // extra unknown field
  };

  // register new random music(title as key)
  const newMusic = await musicsDao.registerMusic(musicData.title, musicData);

  return newMusic;
};
