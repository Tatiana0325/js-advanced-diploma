import Bowman from "../js/characters/Bowman";

test("Information verification", () => {
  const charbase = {
    medal: "\ud83c\udf96",
    swords: "\u2694",
    defense: "\ud83d\udee1",
    health: "\u2764",
  };
  const bowman = new Bowman(1);
  const message = `${charbase.medal}${bowman.level} ${charbase.swords}${bowman.attack} ${charbase.defense}${bowman.defence} ${charbase.health}${bowman.health}`;
  const expected = "\u{1F396}1 \u{2694}25 \u{1F6E1}25 \u{2764}50";

  expect(message).toBe(expected);
});
