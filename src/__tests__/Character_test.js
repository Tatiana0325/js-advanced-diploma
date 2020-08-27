import Character from '../js/Character';
import Bowman from '../js/Bowman';

test('Проверка на ошибку прис оздании объекта new Character()', () => {
  expect(() => new Character()).toThrow();
});

test('Проверка создания обекта new Bowman()', () => {
  const obj = {
    level: 1,
    attack: 25,
    defence: 25,
    health: 50,
    type: 'generic'
  }

  expect(new Bowman(1)).toEqual(obj);
});
