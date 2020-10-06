import { calcTileType } from "../js/utils";

test("index = 0", () => {
  expect(calcTileType(0, 64)).toBe("top-left");
});

test("index = 4", () => {
  expect(calcTileType(4, 64)).toBe("top");
});

test("index = 7", () => {
  expect(calcTileType(7, 64)).toBe("top-right");
});

test("index = 16", () => {
  expect(calcTileType(16, 64)).toBe("left");
});

test("index = 23", () => {
  expect(calcTileType(23, 64)).toBe("right");
});

test("index = 56", () => {
  expect(calcTileType(56, 64)).toBe("bottom-left");
});

test("index = 59", () => {
  expect(calcTileType(59, 64)).toBe("bottom");
});

test("index = 63", () => {
  expect(calcTileType(63, 64)).toBe("bottom-right");
});

test("index = 27", () => {
  expect(calcTileType(27, 64)).toBe("center");
});
