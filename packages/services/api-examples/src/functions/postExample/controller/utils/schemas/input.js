/* eslint-disable no-useless-escape */
export default {
  type: 'object',
  properties: {
    stringExample: { type: 'string', minLength: 1, maxLength: 10 }, // length limited string
    regexExample: { type: 'string', pattern: '^[a-zA-Z]{3}[0-9]{3}$' }, // simple regex matching 3 leters and 3 numbers
    enumExample: { enum: ['value1', 'value2', 'value3'] }, // validating restricted options
    numberExample: { type: 'number', minimum: 0, maximum: 999 }, // validating restricted number
    arrayExample: { type: 'array', items: { type: 'string', maxLength: 3 } }, // validating array items
    objectExample: {
      type: 'object',
      properties: {
        prop: { type: 'string' },
      },
      patternProperties: {
        '^example+': { type: 'number' }, // permit number properties that respects the regex(starts with the word "example")
      },
      required: ['prop'],
      additionalProperties: { type: 'string' }, // permit only string extra properties(except patternProperties cases)
    },
  },
  required: ['stringExample', 'regexExample', 'enumExample', 'numberExample', 'arrayExample', 'objectExample'],
  additionalProperties: false, // prohibit all extra properties
};
