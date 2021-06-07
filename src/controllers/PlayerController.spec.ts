import Player from '@entities/Player';
import Team from '@entities/Team';
import { Request, Response } from 'express';
import { PlayerController } from './PlayerController';

jest.mock('@entities/Player');

export const RequestMock = {} as Request;

export const ResponseMock = {
  status: jest.fn().mockImplementation(() => ResponseMock),
  json: jest.fn().mockImplementation((u) => u),
} as unknown as Response;

const mockUser = {
  _id: 'mock-id',
  firstName: 'User Example',
  lastName: 'Mock',
  age: 20,
  team: 'mock-team-id',
  position: 'mock-position',
  created_at: 'mock-created-at',
  updated_at: 'mock-updated-at',
  __v: 0,
};

Player.create = jest.fn().mockResolvedValueOnce(mockUser);
Team.findOne = jest.fn().mockResolvedValueOnce(true);
Team.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(true);

const playerController = new PlayerController();

describe('PlayerController', () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });
  it('should create a user', async () => {
    const responseStatusCodeSpy = jest.spyOn(ResponseMock, 'status');

    RequestMock.body = {
      firstName: 'User Example',
      lastName: 'Mock',
      age: 20,
      position: 'mock-position',
      team: 'mock-team',
    };

    const response = await playerController.create(RequestMock, ResponseMock);

    expect(responseStatusCodeSpy).toBeCalledWith(201);
    expect(response).toEqual(mockUser);
  });
});
