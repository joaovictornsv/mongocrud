import { TeamController } from '../../src/controllers/TeamController';
import Team from '../../src/entities/Team';
import { TeamResponseMock, TeamResquestMock, TeamArrayResponseMock } from '../../__mocks__/entities/Team.mock';
import { ResponseMock, RequestMock } from '../../__mocks__/express/RequestResponse.mock';

jest.mock('@entities/Team');

// Controller
const teamController = new TeamController();

// Spies
const responseStatusCodeSpy = jest.spyOn(ResponseMock, 'status');

// Util Functions
const createTeamWithSuccess = async () => {
  Team.create = jest.fn().mockImplementationOnce(() => {
    TeamArrayResponseMock.push('mock-team');
    return TeamResponseMock;
  });
  Team.findOne = jest.fn().mockResolvedValueOnce(false);

  RequestMock.body = TeamResquestMock;
  const response = await teamController.create(RequestMock, ResponseMock);

  RequestMock.body = {};
  return response;
};

describe('TeamController', () => {
  beforeEach(() => {
    RequestMock.body = {};
    TeamArrayResponseMock.splice(0, TeamArrayResponseMock.length);
  });
  afterEach(() => jest.clearAllMocks());

  it('should get array of teams', async () => {
    Team.find = jest.fn().mockImplementationOnce(() => Team);
    Team.populate = jest.fn().mockResolvedValueOnce(TeamArrayResponseMock);

    for (let i = 0; i < 5; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createTeamWithSuccess();
    }
    responseStatusCodeSpy.mockClear();

    const response = await teamController.indexAll(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledWith(200);
    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(response).toHaveLength(5);
  });

  it('should create a team', async () => {
    const response = await createTeamWithSuccess();

    expect(responseStatusCodeSpy).toBeCalledWith(201);
    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(response).toEqual(TeamResponseMock);
  });

  it('should not create a team if it already exists', async () => {
    Team.findOne = jest.fn().mockResolvedValueOnce(true);

    const response = await teamController.create(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledWith(400);
    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(response).toEqual({ message: 'Team already exists' });
  });
});
