import Character from "../js/Character";

test("проверка создания класса через Character", () => {
  expect(() => new Character()).toThrow();
});
