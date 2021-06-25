import Ajv from 'ajv';

export default (payload, schema) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(payload);
  const result = {
    isValid,
    errors: validate.errors?.map((e) => ({
      local: e.instancePath,
      description: e.message,
      details: e.params,
    })),
  };

  return result;
};
