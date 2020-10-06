import Character from "../js/Character";
import Bowman from "../js/characters/Bowman";
import Daemon from "../js/characters/Daemon";
import Magician from "../js/characters/Magician";
import Swordsman from "../js/characters/Swordsman";
import Undead from "../js/characters/Undead";
import Vampire from "../js/characters/Vampire";

test("проверка создания класса через Character", () => {
  expect(() => new Character()).toThrow();
});

test("should Bowman", () => {
  const result = new Bowman(1);
  expect(result).toEqual({
    attack: 25,
    defence: 25,
    health: 50,
    hit: 2,
    level: 1,
    step: 2,
    type: "bowman"
  });
});

test("should Daemon", () => {
  const result = new Daemon(1);
  expect(result).toEqual({
    attack: 10,
    defence: 40,
    health: 50,
    hit: 4,
    level: 1,
    step: 1,
    type: "daemon"
  });
});

test("should Swordsman", () => {
  const result = new Swordsman(1);
  expect(result).toEqual({
    attack: 40,
    defence: 10,
    health: 50,
    hit: 1,
    level: 1,
    step: 4,
    type: "swordsman"
  });
});

test("should Magician", () => {
  const result = new Magician(1);
  expect(result).toEqual({
    attack: 10,
    defence: 40,
    health: 50,
    hit: 4,
    level: 1,
    step: 1,
    type: "magician"
  });
});

test("should Vampire", () => {
  const result = new Vampire(1);
  expect(result).toEqual({
    attack: 25,
    defence: 25,
    health: 50,
    hit: 2,
    level: 1,
    step: 2,
    type: "vampire"
  });
});

test("should Undead", () => {
  const result = new Undead(1);
  expect(result).toEqual({
    attack: 40,
    defence: 10,
    health: 50,
    hit: 1,
    level: 1,
    step: 4,
    type: "undead"
  });
});