import themes from './themes';
import GamePlay from './GamePlay';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';
import {generateTeam} from './generators';
import cursors from './cursors';
import GameState from './GameState';

export function matrix(length) {
  const matrix = [];
  let el = 0;

  for (let i = 0; i < length; i += Math.sqrt(length)) { 
    matrix[el] = [];
    for (let j = i; j < ((el + 1) * Math.sqrt(length)); j++) {
      matrix[el].push(j);
    }
    el++;
  };

  return matrix;
};

export function binar(position, length) {
  let arr = matrix(length);
  let i = 0;
  let j = 0;
  let flag = false;

  arr.forEach((element) => {
    element.forEach(item => {
      if (item == position) {
        i = element.indexOf(item);
        flag = true;
      };
    });

    if (flag) {
      j = arr.indexOf(element);
      flag = false;
    }; 
  });

  return [j, i];
};

export function distArray(position, length, dist) {
    const charBinarPosition = binar(position, length);
    const matrixArr = matrix(length);

    let minX = charBinarPosition[0] - dist;
    let maxX = charBinarPosition[0] + dist;
    let minY = charBinarPosition[1] - dist;
    let maxY = charBinarPosition[1] + dist;

    if (minX < 0) {
      minX = 0;
    };

    if (maxX >= (Math.sqrt(length) - 1)) {
      maxX = (Math.sqrt(length) - 1);
    };

    if (minY < 0) {
      minY = 0;
    };

    if (maxY >= (Math.sqrt(length) - 1)) {
      maxY = (Math.sqrt(length) - 1);
    };

    const distArr = [];

    matrixArr.forEach(element => {
      element.forEach(el => {
        const binarEl = binar(el, length);
        if (((binarEl[0] >= minX) && (binarEl[0] <= maxX)) && ((binarEl[1] >= minY) && (binarEl[1] <= maxY))) {           
          distArr.push(el);
        }
      })
    });

    distArr.splice(distArr.indexOf(position), 1);

    return distArr;
};

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.level = 1;
    this.characterArr = [];
    this.selectedChar = null;
    this.state = null;
    this.balls = 0;
    this.loadFlag = false;
    this.saveFlag = false;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    switch (this.level) {
      case 1: {this.theme = themes.prairie; break;}
      case 2: {this.theme = themes.desert; break;}
      case 3: {this.theme = themes.arctic; break;}
      case 4: {this.theme = themes.mountain; break;}
    }

    this.gamePlay.drawUi(this.theme);

    if (!this.loadFlag) {
      const startUserGame = [Bowman, Swordsman];
      const user = [Bowman, Swordsman, Magician];
      const comp = [Vampire, Daemon, Undead];

      const {cells} = this.gamePlay;
    
      const userCells = [];
      cells.forEach(element => {
        if ((cells.indexOf(element) % 8 == 0) || (cells.indexOf(element) % 8 == 1)) {
          userCells.push(cells.indexOf(element));
        }
      });

      const compCells = [];
      cells.forEach(element => {
        if ((cells.indexOf(element) % 8 == 6) || (cells.indexOf(element) % 8 == 7)) {
          compCells.push(cells.indexOf(element));
        }
      });
    
      function cellsTeamSet(cell, team) {
        let set = new Set();

        while (set.size < team.length) {
          let index = Math.floor(Math.random() * cell.length);
          set.add(index);
        };

        return Array.from(set);
      };

      if (this.level == 1) {
        const startUser = generateTeam(startUserGame, 1, 2);
        const startComp = generateTeam(comp, 1, 2);

        let uCells = cellsTeamSet(userCells, startUser);

        startUser.forEach((element, index) => {
          let indexChar = uCells[index];
          this.characterArr.push(new PositionedCharacter(element, userCells[indexChar]));
        });

        let cCells = cellsTeamSet(compCells, startComp);

        startComp.forEach((element, index) => {
          let indexChar = cCells[index];
          this.characterArr.push(new PositionedCharacter(element, compCells[indexChar]));
        });
      } else if (this.level == 2) {
        this.characterArr.forEach(item => {
          item.character.levelUp();
        });

        let userTeam = generateTeam(user, 1, 1);
        let uCells = cellsTeamSet(userCells, userTeam);
        userTeam.forEach((element, i) => {
          let index = uCells[i]
          this.characterArr.push(new PositionedCharacter(element, userCells[index]));
        });

        let compLength = this.characterArr.length
  
        let compTeam = generateTeam(comp, 2, compLength);
        let cCells = cellsTeamSet(compCells, compTeam);
        compTeam.forEach((element, i) => {
          let index = cCells[i];
          this.characterArr.push(new PositionedCharacter(element, compCells[index]));
        });    
      } else if (this.level == 3) {
        this.characterArr.forEach(item => {
          item.character.levelUp();
        });

        let userTeam = generateTeam(user, 2, 2);
        let uCells = cellsTeamSet(userCells, userTeam);
        userTeam.forEach((element, i) => {
          let index = uCells[i];
          this.characterArr.push(new PositionedCharacter(element, userCells[index]));
        });
  
        let compLength = this.characterArr.length

        let compTeam = generateTeam(comp, 3, compLength);
        let cCells = cellsTeamSet(compCells, compTeam);
        compTeam.forEach((element, i) => {
          let index = cCells[i];
          this.characterArr.push(new PositionedCharacter(element, compCells[index]));
        });
      } else if (this.level == 4) {
        this.characterArr.forEach(item => {
          item.character.levelUp();
        });

        let userTeam = generateTeam(user, 3, 2);
        let uCells = cellsTeamSet(userCells, userTeam);
        userTeam.forEach((element, i) => {
          let index = uCells[i];
          this.characterArr.push(new PositionedCharacter(element, userCells[index]));
        });
  
        let compLength = this.characterArr.length;

        let compTeam = generateTeam(comp, 4, compLength);
        let cCells = cellsTeamSet(compCells, compTeam);
        compTeam.forEach((element, i) => {
          let index = cCells[i];
          this.characterArr.push(new PositionedCharacter(element, compCells[index]));
        });
      }
    } else {
      this.loadFlag = false;
    }

    this.gamePlay.redrawPositions(this.characterArr);

    this.events();
  }

  events() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(this.newGame.bind(this));
    this.gamePlay.addSaveGameListener(this.saveGame.bind(this));
    this.gamePlay.addLoadGameListener(this.loadGame.bind(this));
  }

  async userAttack() {
    const {defence} = this.state.target.character;
    const {attack} = this.selectedChar.character;
  
    const damage = +(Math.max(attack - defence, attack * 0.1).toFixed(1));
    this.state.target.character.health = +((this.state.target.character.health - damage).toFixed(1));
  
    if (this.state.target.character.health <= 0) {
      let number = this.characterArr.indexOf(this.state.target)
      this.characterArr.splice(number, 1);
    }
  
    const game = await this.gamePlay.showDamage(this.state.target.position, damage);
    this.gamePlay.redrawPositions(this.characterArr);
  }

  async compGame() {
    let teamComp = [];
    let teamUser = [];
    this.characterArr.forEach(item => {
      if (item.character.type == 'vampire' || item.character.type == 'undead' || item.character.type == 'daemon') {
        teamComp.push(item);
      }

      if (item.character.type == 'bowman' || item.character.type == 'swordsman' || item.character.type == 'magician') {
        teamUser.push(item);
      }
    });

    if (teamComp.length > 0) {
      const compAttak = [];
      teamComp.forEach(item => {
        let attackArr = distArray(item.position, 64, item.character.hit);
        teamUser.forEach(elem => {
          if (attackArr.indexOf(elem.position) !== -1) {
            compAttak.push({attacker: item, defender: elem});
          }
        })
      });

      compAttak.sort((a, b) => { 
        const { attack } = a.attacker.character;
        const { defence } = a.defender.character;
        const { attack: attackB } = b.attacker.character;
        const { defence: defenceB } = b.defender.character;
        return (defence - attack) - (defenceB - attackB);
      });

      if (compAttak.length > 0) {
        const compPlayer = compAttak[0].attacker;
        const userPlayer = compAttak[0].defender;

        const {defence} = userPlayer.character;
        const {attack} = compPlayer.character;
  
        const damage = +(Math.max(attack - defence, attack * 0.1).toFixed(1));
        userPlayer.character.health = +((userPlayer.character.health - damage).toFixed(1));
  
        if (userPlayer.character.health <= 0) {
          let number = this.characterArr.indexOf(userPlayer)
          this.characterArr.splice(number, 1);
        }
  
        const game = await this.gamePlay.showDamage(userPlayer.position, damage);
      } else {
        let indexComp = Math.floor(Math.random() * teamComp.length);
        const userPositions = [];
        teamUser.forEach(item => {
          userPositions.push(item.position);
        })
        
        const player = teamComp[indexComp];
        const copmStep = distArray(player.position, 64, player.character.step);

        let indexSet = new Set();

        while (indexSet.size < 1) {
          let indexC = Math.floor(Math.random() * copmStep.length);
          if(userPositions.indexOf(indexC) == -1) {
            indexSet.add(indexC);
          }
        };

        const indexArray = Array.from(indexSet);

        let indexChar = this.characterArr.indexOf(player);
        this.characterArr[indexChar].position = indexArray[0];        
      }
  } else {
      this.characterArr.forEach(item => this.balls += item.character.health);
      this.level++;
      if (this.level > 4) {
        this.characterArr.forEach(item => this.balls += item.character.health);
        this.characterArr = [];
        this.selectedChar = null;
        this.state = null;
        GamePlay.showMessage(`Вы выйграли!\n Счет: ${this.balls}`);
      } else {
        this.init();
        this.events();  
      }
    }

    this.gamePlay.redrawPositions(this.characterArr);
  }

  onCellClick(index) {
    // TODO: react to click
    this.saveFlag = false;
    this.characterArr.forEach((item) => { 
      if (item.position === index) {
        if (item.character.type == 'bowman' || item.character.type == 'swordsman' || item.character.type == 'magician' || this.state.status == 'partner') {
          if ((this.selectedChar != null) && (this.selectedChar.position == index)) { 
            this.gamePlay.deselectCell(this.selectedChar.position);
            this.selectedChar = null;
          } else {
            if (this.selectedChar != null) {
              this.gamePlay.deselectCell(this.selectedChar.position);
            };

            this.gamePlay.selectCell(index);
            this.selectedChar = item;
          }
        } else if (this.state !== null && this.state.status === 'attack') {
          const battle = async () => {
            const attack = await this.userAttack();
            this.state = null;
            const bot = await this.compGame();
            this.gamePlay.deselectCell(this.selectedChar.position);
            this.selectedChar = null;
            return null;
          }
          battle();
        }
      }
    });

    if (this.state != null && this.state.status == 'go') {
      this.characterArr.forEach(item => {
        if (item == this.selectedChar) {
          this.gamePlay.deselectCell(this.selectedChar.position);
          item.position = index;
          this.gamePlay.redrawPositions(this.characterArr);
          this.compGame();
          this.state = null;
          this.selectedChar = null;
        }
      })
    };

    if (this.state != null && this.state.status == 'never') {
      GamePlay.showMessage('Переход невозможен');
    }

    const userT = [];
    this.characterArr.forEach(item => {
      if (item.character.type == 'bowman' || item.character.type == 'swordsman' || item.character.type == 'magician') {
        userT.push(item);
      }
    });

    if (userT.length == 0) {
      this.characterArr = [];
      this.selectedChar = null;
      this.gamePlay.redrawPositions(this.characterArr);
      this.state = null;
      GamePlay.showMessage(`Вы проиграли!\n Счет: ${this.balls}`);
    };
  }  

  onCellEnter(index) {
    // TODO: react to mouse enter
    this.saveFlag = false;
    const charbase = {
      medal: '\ud83c\udf96',
      swords: '\u2694',
      defense: '\ud83d\udee1',
      health: '\u2764',
    };
    this.gamePlay.setCursor(cursors.auto);
    this.characterArr.forEach((e) => {
      if (e.position === index) {
        const message = `${charbase.medal}${e.character.level} ${charbase.swords}${e.character.attack} ${charbase.defense}${e.character.defence} ${charbase.health}${e.character.health} `;

        this.gamePlay.showCellTooltip(message, index);
        this.gamePlay.setCursor(cursors.pointer);
      }
    });

    const compPositions = [];
    const userPosition =[];
    
    this.characterArr.forEach(item => {
      if (item.character.type == 'daemon' || item.character.type == 'vampire' || item.character.type == 'undead') {
        compPositions.push(item.position);
      } else {
        userPosition.push(item.position);
      }
    })

    if (this.selectedChar != null) {
      const stepArray = distArray(this.selectedChar.position, 64, this.selectedChar.character.step);
        if (stepArray.indexOf(index) != -1) {
          if (compPositions.indexOf(index) != -1) {
            this.gamePlay.setCursor(cursors.notallowed);
            this.state = { status: 'never' };
          } else if (userPosition.indexOf(index) != -1) {
            this.gamePlay.setCursor(cursors.pointer);
            this.state = { status: 'partner' };
          } else {
            this.gamePlay.setCursor(cursors.pointer);
            this.gamePlay.selectCell(index, 'green');
            this.state = { status: 'go', index };
          }
        } else {
          this.gamePlay.setCursor(cursors.notallowed);
          this.state = null;
        }
      const attackArray = distArray(this.selectedChar.position, 64, this.selectedChar.character.hit);

      this.characterArr.forEach((item) => {
        if (item.character.type == 'daemon' || item.character.type == 'vampire' || item.character.type == 'undead') {
          if (attackArray.indexOf(item.position) != -1 && index == item.position) {
            this.gamePlay.setCursor(cursors.crosshair);
            this.gamePlay.selectCell(index, 'red');
            this.state = { status: 'attack', target: item };
          }
        } else if (item.position == index) {
          this.gamePlay.setCursor(cursors.pointer);
        }
      });
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.saveFlag = false;
    if (this.selectedChar != null && this.selectedChar.position != index) {
      this.gamePlay.deselectCell(index);
    }
  }

  newGame() {
    this.level = 1;
    this.loadFlag = false;
    this.saveFlag = false;
    this.characterArr = [];
    this.selectedChar = null;
    this.state = null;
    this.init();
    this.events();
    }

  saveGame() {
    if(!this.saveFlag) {
      const saveObj = {};
      saveObj.charArr = this.characterArr;
      saveObj.balls = this.balls;
      saveObj.level = this.level;
      this.stateService.save(saveObj);
      this.saveFlag = true;
      GamePlay.showMessage('Игра загружена!');
    }
  }

  loadGame() {
    try {
      const loadObj = this.stateService.load();

      if (loadObj) {
        this.loadFlag = true;
        this.characterArr = loadObj.charArr;
        this.level = loadObj.level;
        this.balls = loadObj.balls;
        this.init();
        this.events();
      }
    } catch (e) {
      GamePlay.showMessage('Failed!');
      this.newGame();
    }
  }
}
