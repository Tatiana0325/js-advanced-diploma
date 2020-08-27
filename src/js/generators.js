/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here  
  let indexType = Math.floor( Math.random() * allowedTypes.length );
  let randomClass = new allowedTypes[indexType]();
  let indexLevel = Math.floor( (Math.random() * maxLevel) );
  randomClass.level = indexLevel + 1;

  for (let i = 1; randomClass.level > i; i += 1) {
    randomClass.levelUp();
    randomClass.level -= 1;
  }
  yield randomClass;
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const arrTeam = [];
  for (let i = 0; i < characterCount; i++) {
    arrTeam.push(characterGenerator(allowedTypes, maxLevel).next().value);
  };

  return arrTeam
}
