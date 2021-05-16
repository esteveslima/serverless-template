import * as dynamoose from 'dynamoose';
import schemaOptions from '../setup/schema-options';
import setupDynamoose from '../setup/dynamoose';

setupDynamoose(); // setting up dynamoose before entrypoint

// Using a single table, which could be splitted in different ones.
// Definitions between {} are variables
// PK/SK schema: {type}_{key} / {sk}
// Query possibilities:
// music_{key} / music_{key}              ->  raw music data, key being the name with no spaces
// list_genres / list_genres              ->  list of known genres
// info_{region} / info_{region}          ->  music's info by region(count by region)
// info_{region} / release_{timestamp}    ->  music's info by region and release timestamp, query for region's oldest/newest music by sorting sortKey

const musicsSchema = new dynamoose.Schema({
  type_key: {
    type: String,
    hashKey: true, // explicetely defining the hashkey
    validate: /^[^_\s]+_[^_\s]+$/, // validate 2 words separated by single "_" (dynamic composite key)
    required: true,
  },
  sk: {
    type: String,
    rangeKey: true, // explicetely defining the rangeKey
    required: true,
  },

  // Data for music_{key} / music_{key} (specific music)
  data: {
    type: Object,
    schema: {
      title: { type: String, required: true },
      artist: { type: String, required: true /* default: 'Unknown' */ }, // caution, "default" implies the requirements for "data"
      genre: { type: String, required: true },
      region: {
        type: String,
        required: true,
        enum: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      },
      subjects: { type: Array, schema: [String], required: true },
      release: { type: Date, required: true },
      duration: { type: Number, required: true },
    },
    required: false,
  },

  // Data for list_genres / list_genres (updated when a new music has a new genre)
  genres: {
    type: Array,
    schema: [String],
    required: false,
  },

  // Data for info_{region} / info_{region} (updated with every new music)
  count: {
    type: Number,
    required: false,
  },

  // Data for info_{region} / release_{timestamp} (reference to music, updated everytime a music from a region has a older/newer release date)
  ref: {
    type: dynamoose.THIS,
    required: false,
  },
}, {
  saveUnknown: true, // allow properties not defined in schema
  timestamps: true, // enable timestamps for document
});

const Musics = dynamoose.model('Musics', musicsSchema, schemaOptions); // create model instance

export default Musics;
