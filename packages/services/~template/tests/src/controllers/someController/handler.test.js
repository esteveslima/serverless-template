/* eslint-disable import/first */

// Import sut resources
// import ...

// Mock sut resources
// jest.mock(...)

// Import mocks
import * as mocks from '../../../mocks/src/controllers/someController/handler.mock';

// Import sut
import sut from '../../../../src/controllers/someController/handler';

describe('(@services/~template): someController', () => {
  beforeAll(() => { });
  beforeEach(() => { jest.resetAllMocks(); });
  afterEach(() => { });
  afterAll(() => { jest.restoreAllMocks(); });

  it('expect [test scope] to [test goal] if [scenario conditions]   <-   Test description template', () => { expect(true).toBeTruthy(); });

  it('expect [example template] to [return event body parameters] if [everything went right]', async () => {
    const event = mocks.sut.PARAMETERS.OK;

    const sutResult = await sut(event);

    expect(sutResult).toEqual(expect.objectContaining({
      result: event.body.params,
    }));
  });
});
