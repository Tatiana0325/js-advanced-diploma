import Bowman from "./characters/Bowman";
import Swordsman from "./characters/Swordsman";
import Magician from "./characters/Magician";
import Daemon from "./characters/Daemon";
import Vampire from "./characters/Vampire";
import Undead from "./characters/Undead";

export default class Team {
  static startUserTeam() {
    return [Bowman, Swordsman];
  }

  static userTeam() {
    return [Bowman, Swordsman, Magician];
  }

  static compTeam() {
    return [Vampire, Daemon, Undead];
  }
}
