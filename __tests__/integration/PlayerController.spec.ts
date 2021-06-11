import { PlayerController } from '../../src/controllers/PlayerController';
import Player from '../../src/entities/Player';
import Team from '../../src/entities/Team';
import { PlayerArrayResponseMock, PlayerResponseMock, PlayerResquestMock } from '../../__mocks__/entities/Player.mock';
import { TeamResponseMock } from '../../__mocks__/entities/Team.mock';
import { ResponseMock, RequestMock } from '../../__mocks__/express/RequestResponse.mock';

jest.mock('@entities/Player');
jest.mock('@entities/Team');

// Models
type PlayerModel = typeof Player;
type TeamModel = typeof Team;

const PlayerMock = Player as jest.Mocked<PlayerModel>;
const TeamMock = Team as jest.Mocked<TeamModel>;

// Controller
const PlayerControllerMock = PlayerController as jest.Mock<PlayerController>;

const playerController = new PlayerControllerMock() as jest.Mocked<PlayerController>;

// Spies
const responseStatusCodeSpy = jest.spyOn(ResponseMock, 'status');

// Util Functions
const createUserWithSuccess = async () => {
  PlayerMock.create = jest.fn().mockImplementationOnce(() => {
    PlayerArrayResponseMock.push('mock-player');
    return PlayerResponseMock;
  });
  TeamMock.findOne = jest.fn().mockResolvedValueOnce(true);
  TeamMock.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => {
    TeamResponseMock.players.push('mock-player');
  });

  RequestMock.body = PlayerResquestMock;
  const response = await playerController.create(RequestMock, ResponseMock);

  RequestMock.body = {};
  return response;
};

describe('PlayerController', () => {
  beforeEach(() => {
    RequestMock.body = {};
    TeamResponseMock.players = [];
    PlayerArrayResponseMock.splice(0, PlayerArrayResponseMock.length);
  });
  afterEach(() => jest.clearAllMocks());

  it('should get array of users', async () => {
    for (let i = 0; i < 5; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createUserWithSuccess();
    }
    responseStatusCodeSpy.mockClear();

    PlayerMock.find = jest.fn().mockImplementationOnce(() => Player);
    PlayerMock.populate = jest.fn().mockResolvedValueOnce(PlayerArrayResponseMock);
    const response = await playerController.indexAll(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(responseStatusCodeSpy).toBeCalledWith(200);
    expect(response).toHaveLength(5);
  });
  it('should create a user', async () => {
    const response = await createUserWithSuccess();

    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(responseStatusCodeSpy).toBeCalledWith(201);
    expect(response).toEqual(PlayerResponseMock);
  });

  it('should to add a user in a team', async () => {
    await createUserWithSuccess();

    expect(TeamResponseMock.players).toHaveLength(1);
  });

  it('should not create a user without a required fields', async () => {
    const response = await playerController.create(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledWith(400);
    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(response).toEqual({ message: 'Provide the required fields' });
  });

  it('should not create a user without a team', async () => {
    const {
      firstName, lastName, age, position,
    } = PlayerResponseMock;

    RequestMock.body = {
      firstName, lastName, age, position,
    };

    const response = await playerController.create(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledWith(400);
    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(response).toEqual({ message: 'Team not provided' });
  });

  it('should not create a user if a team provided not exists', async () => {
    TeamMock.findOne = jest.fn().mockResolvedValueOnce(false);

    const {
      firstName, lastName, age, position, team,
    } = PlayerResponseMock;

    RequestMock.body = {
      firstName, lastName, age, position, team,
    };

    const response = await playerController.create(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledWith(400);
    expect(responseStatusCodeSpy).toBeCalledTimes(1);
    expect(response).toEqual({ message: 'Team provided not found' });
  });
});
