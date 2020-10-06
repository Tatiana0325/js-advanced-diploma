import GameStateService from "./gameLoad/GameStateService";
import objLoad from "./gameLoad/objLoad";

jest.mock("./gameLoad/objLoad");
beforeEach(() => {
  jest.resetAllMocks();
});

test("Loading", () => {
  const expected = `{
    'charArr': [],
    'balls': 0,
    'level': 1
  }`;
  objLoad.mockReturnValue(expected);

  const recived = GameStateService.load();

  expect(JSON.stringify(recived)).toBe(expected);
});

test("Error", () => {
  const expected = "";
  objLoad.mockReturnValue(expected);

  expect(() => GameStateService.load()).toThrow();
});
