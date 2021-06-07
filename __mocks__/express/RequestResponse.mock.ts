import { Request, Response } from 'express';

export const RequestMock = {} as Request;

export const ResponseMock = {
  status: jest.fn().mockImplementation(() => ResponseMock),
  json: jest.fn().mockImplementation((u) => u),
} as unknown as Response;
