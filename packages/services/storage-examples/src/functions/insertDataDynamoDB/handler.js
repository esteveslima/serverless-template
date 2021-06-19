import { lambda } from '@sls/lib';
import controller from './controller/index';

// TODO: readme
// NoSQL document orientaded with transactions not ACID atomic/isolated.
// High horizontal scalability and performance with dynamic data structures with a single static lookup access.
// The schema must be chosen carefully, DynamoDB is not suitable to query data effectivelly. It should be planned to store data in the way it's intended to be read.
// Data accessed through direct lookups for its hashkey with an optional secondary rangekey/sortKey. Custom indexes on properties are possible with extra costs.
// Also data could be queried by hashkey and filtered by sort key. Other complexes queries would require a scan, which is very innefective because iterates over the entire table.
// There are schema designs that can be used to store extra query data on the table, if those query data are previously known and aren't complex nor mutable.
// Few Designs References: https://www.serverlesslife.com/DynamoDB_Design_Patterns_for_Single_Table_Design.html

// Example contemplates a model with useful applications(another similar example at https://github.com/esteveslima/slvmm)

export default lambda(async (event) => {
  const params = event.body;

  const result = await controller(params);

  return result;
});
