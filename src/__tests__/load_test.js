import GameStateService from "../js/GameStateService";

const stateService = new GameStateService({});

jest.mock("../js/GameStateService");
beforeEach(() => {
  jest.resetAllMocks();
});

test("Check load", () => {
  const expected = { point: 10, maxPoint: 10, level: 1 };
  stateService.load.mockReturnValue(expected);
  const recived = stateService.load();
  expect(recived).toBe(expected);
});
