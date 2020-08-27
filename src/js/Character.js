export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    this.step = 0;
    this.hit = 0;
    // TODO: throw error if user use "new Character()"
    if(new.target.name == 'Character') {
      throw new Error('fatal error')
    }
  }

  levelUp() {
    this.level += 1;
    this.attack = +(Math.max(this.attack, this.attack * (1.8 - (1 - this.health / 100)))
      .toFixed(1));
    this.defence = +(Math.max(this.defence, this.defence * (1.8 - (1 - this.health / 100)))
      .toFixed(1));
    this.health = Math.min(this.health + 80, 100);
    if (this.health > 100) this.health = 100;
  }
}
