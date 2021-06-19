import { lambda, logger } from '@sls/lib';
import controller from './controller/index';

export default lambda(async (event) => {
  const parameters = event.body;
  // TODO: improve example -> input data, joi validate(maybe find a way to use native json schema valdiator from aws), return generated file pdf/xls/doc/... (binary data)
  const result = await controller(parameters);

  return result;
});
