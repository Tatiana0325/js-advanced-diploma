import Character from "../Character";

test("проверка создания класса через Character", () => {
  expect(() => new Character()).toThrow();
});
