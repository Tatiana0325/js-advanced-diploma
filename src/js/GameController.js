import themes from "./themes";
import GamePlay from "./GamePlay";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import { generateTeam } from "./generators";
import cursors from "./cursors";
import GameState from "./GameState";
import { distArray, matrix } from "./functions";

function correctType(type) {
  return type === "bowman" || type === "swordsman" || type === "magician"
    ? true
    : false;
}

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.level = 1;
    this.matrix = matrix(64);
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
    const obj = {
      1: themes.prairie,
      2: themes.desert,
      3: themes.arctic,
      4: themes.mountain,
    };

    this.theme = obj[this.level];

    this.gamePlay.drawUi(this.theme);

    if (!this.loadFlag) {
      const startUserGame = Team.startUserTeam();
      const user = Team.userTeam();
      const comp = Team.compTeam();

      const { cells } = this.gamePlay;

      const userCells = [];
      cells.forEach((element) => {
        if (
          cells.indexOf(element) % 8 === 0 ||
          cells.indexOf(element) % 8 === 1
        ) {
          userCells.push(cells.indexOf(element));
        }
      });

      const compCells = [];
      cells.forEach((element) => {
        if (
          cells.indexOf(element) % 8 === 6 ||
          cells.indexOf(element) % 8 === 7
        ) {
          compCells.push(cells.indexOf(element));
        }
      });

      function cellsTeamSet(cell, team) {
        let set = new Set();

        while (set.size < team.length) {
          let index = Math.floor(Math.random() * cell.length);
          set.add(index);
        }

        return Array.from(set);
      }

      if (this.level === 1) {
        const startUser = generateTeam(startUserGame, 1, 2);
        const startComp = generateTeam(comp, 1, 2);

        let uCells = cellsTeamSet(userCells, startUser);

        startUser.forEach((element, index) => {
          let indexChar = uCells[index];
          this.characterArr.push(
            new PositionedCharacter(element, userCells[indexChar])
          );
        });

        let cCells = cellsTeamSet(compCells, startComp);

        startComp.forEach((element, index) => {
          let indexChar = cCells[index];
          this.characterArr.push(
            new PositionedCharacter(element, compCells[indexChar])
          );
        });
      } else if (this.level === 2) {
        this.characterArr.forEach((item) => {
          item.character.levelUp();
        });

        let userTeam = generateTeam(user, 1, 1);
        let uCells = cellsTeamSet(userCells, userTeam);
        userTeam.forEach((element, i) => {
          let index = uCells[i];
          this.characterArr.push(
            new PositionedCharacter(element, userCells[index])
          );
        });

        let compLength = this.characterArr.length;

        let compTeam = generateTeam(comp, 2, compLength);
        let cCells = cellsTeamSet(compCells, compTeam);
        compTeam.forEach((element, i) => {
          let index = cCells[i];
          this.characterArr.push(
            new PositionedCharacter(element, compCells[index])
          );
        });
      } else if (this.level === 3) {
        this.characterArr.forEach((item) => {
          item.character.levelUp();
        });

        let userTeam = generateTeam(user, 2, 2);
        let uCells = cellsTeamSet(userCells, userTeam);
        userTeam.forEach((element, i) => {
          let index = uCells[i];
          this.characterArr.push(
            new PositionedCharacter(element, userCells[index])
          );
        });

        let compLength = this.characterArr.length;

        let compTeam = generateTeam(comp, 3, compLength);
        let cCells = cellsTeamSet(compCells, compTeam);
        compTeam.forEach((element, i) => {
          let index = cCells[i];
          this.characterArr.push(
            new PositionedCharacter(element, compCells[index])
          );
        });
      } else if (this.level === 4) {
        this.characterArr.forEach((item) => {
          item.character.levelUp();
        });

        let userTeam = generateTeam(user, 3, 2);
        let uCells = cellsTeamSet(userCells, userTeam);
        userTeam.forEach((element, i) => {
          let index = uCells[i];
          this.characterArr.push(
            new PositionedCharacter(element, userCells[index])
          );
        });

        let compLength = this.characterArr.length;

        let compTeam = generateTeam(comp, 4, compLength);
        let cCells = cellsTeamSet(compCells, compTeam);
        compTeam.forEach((element, i) => {
          let index = cCells[i];
          this.characterArr.push(
            new PositionedCharacter(element, compCells[index])
          );
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
    const { defence } = this.state.target.character;
    const { attack } = this.selectedChar.character;

    const damage = +Math.max(attack - defence, attack * 0.1).toFixed(1);
    this.state.target.character.health = +(
      this.state.target.character.health - damage
    ).toFixed(1);

    if (this.state.target.character.health <= 0) {
      let number = this.characterArr.indexOf(this.state.target);
      this.characterArr.splice(number, 1);
    }

    const game = await this.gamePlay.showDamage(
      this.state.target.position,
      damage
    );
    this.gamePlay.redrawPositions(this.characterArr);
  }

  async compGame() {
    let teamComp = [];
    let teamUser = [];
    this.characterArr.forEach((item) => {
      if (!correctType(item.character.type)) {
        teamComp.push(item);
      }

      if (correctType(item.character.type)) {
        teamUser.push(item);
      }
    });

    if (teamComp.length > 0) {
      const compAttak = [];
      teamComp.forEach((item) => {
        let attackArr = distArray(
          item.position,
          this.matrix,
          item.character.hit
        );
        teamUser.forEach((elem) => {
          if (attackArr.indexOf(elem.position) !== -1) {
            compAttak.push({ attacker: item, defender: elem });
          }
        });
      });

      compAttak.sort((a, b) => {
        const { attack } = a.attacker.character;
        const { defence } = a.defender.character;
        const { attack: attackB } = b.attacker.character;
        const { defence: defenceB } = b.defender.character;
        return defence - attack - (defenceB - attackB);
      });

      if (compAttak.length > 0) {
        const compPlayer = compAttak[0].attacker;
        const userPlayer = compAttak[0].defender;

        const { defence } = userPlayer.character;
        const { attack } = compPlayer.character;

        const damage = +Math.max(attack - defence, attack * 0.1).toFixed(1);
        userPlayer.character.health = +(
          userPlayer.character.health - damage
        ).toFixed(1);

        if (userPlayer.character.health <= 0) {
          let number = this.characterArr.indexOf(userPlayer);
          this.characterArr.splice(number, 1);
        }

        const game = await this.gamePlay.showDamage(
          userPlayer.position,
          damage
        );
      } else {
        let indexComp = Math.floor(Math.random() * teamComp.length);

        const player = teamComp[indexComp];

        let compStep = 0;
        compStep = distArray(
          player.position,
          this.matrix,
          player.character.step
        );

        this.characterArr.forEach((item) => {
          if(compStep.indexOf(item.position) !== -1) {
            let el = compStep.indexOf(item.position);
            compStep.splice(el, 1);
          }          
        });

        let indexC = Math.floor(Math.random() * compStep.length);
        let step = compStep[indexC];

        let indexChar = this.characterArr.indexOf(player);
        this.characterArr[indexChar].position = step;
      }
    } else {
      this.characterArr.forEach(
        (item) => (this.balls += item.character.health)
      );
      this.level++;
      if (this.level > 4) {
        this.characterArr.forEach(
          (item) => (this.balls += item.character.health)
        );
        GamePlay.showMessage(`Вы выйграли!\n Счет: ${this.balls}`);
        this.characterArr = [];
        this.selectedChar = null;
        this.state = null;
      } else {
        this.init();
        this.events();
      }
    }

    this.gamePlay.redrawPositions(this.characterArr);
  }

  onCellClick(index) {
    // TODO: react to click
    this.gamePlay.deselectCell(index);
    this.saveFlag = false;
    this.loadFlag = false;
    this.characterArr.forEach((item) => {
      if (item.position === index) {
        if (
          correctType(item.character.type) ||
          this.state.status === "partner"
        ) {
          if (
            this.selectedChar !== null &&
            this.selectedChar.position === index
          ) {
            this.gamePlay.deselectCell(this.selectedChar.position);
            this.selectedChar = null;
          } else {
            if (this.selectedChar !== null) {
              this.gamePlay.deselectCell(this.selectedChar.position);
            }

            this.gamePlay.selectCell(index);
            this.selectedChar = item;
          }
        } else if (this.state !== null && this.state.status === "attack") {
          const battle = async () => {
            const attack = await this.userAttack();
            this.gamePlay.deselectCell(this.selectedChar.position);
            this.state = null;
            const bot = await this.compGame();
            this.selectedChar = null;
            return null;
          };
          battle();
        }
      }
    });

    if (this.state !== null && this.state.status === "go") {
      this.characterArr.forEach((item) => {
        if (item === this.selectedChar) {
          this.gamePlay.deselectCell(this.selectedChar.position);
          item.position = index;
          this.gamePlay.redrawPositions(this.characterArr);
          this.compGame();
          this.state = null;
          this.selectedChar = null;
        }
      });
    }

    if (this.state !== null && this.state.status === "never") {
      GamePlay.showMessage("Переход невозможен");
    }

    const userT = [];
    this.characterArr.forEach((item) => {
      if (correctType(item.character.type)) {
        userT.push(item);
      }
    });

    if (userT.length === 0) {
      GamePlay.showMessage(`Вы проиграли!\n Счет: ${this.balls}`);
      this.newGame();
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    this.gamePlay.deselectCell(index);
    this.saveFlag = false;
    this.loadFlag = false;
    const charbase = {
      medal: "\ud83c\udf96",
      swords: "\u2694",
      defense: "\ud83d\udee1",
      health: "\u2764",
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
    const userPosition = [];

    this.characterArr.forEach((item) => {
      if (!correctType(item.character.type)) {
        compPositions.push(item.position);
      } else {
        userPosition.push(item.position);
      }
    });

    if (this.selectedChar != null) {
      const stepArray = distArray(
        this.selectedChar.position,
        this.matrix,
        this.selectedChar.character.step
      );
      if (stepArray.indexOf(index) !== -1) {
        if (compPositions.indexOf(index) !== -1) {
          this.gamePlay.setCursor(cursors.notallowed);
          this.state = { status: "never" };
        } else if (userPosition.indexOf(index) !== -1) {
          this.gamePlay.setCursor(cursors.pointer);
          this.state = { status: "partner" };
        } else {
          this.gamePlay.setCursor(cursors.pointer);
          this.gamePlay.selectCell(index, "green");
          this.state = { status: "go", index };
        }
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
        this.state = null;
      }
      const attackArray = distArray(
        this.selectedChar.position,
        this.matrix,
        this.selectedChar.character.hit
      );

      this.characterArr.forEach((item) => {
        if (!correctType(item.character.type)) {
          if (
            attackArray.indexOf(item.position) !== -1 &&
            index === item.position
          ) {
            this.gamePlay.setCursor(cursors.crosshair);
            this.gamePlay.selectCell(index, "red");
            this.state = { status: "attack", target: item };
          }
        } else if (item.position === index) {
          this.gamePlay.setCursor(cursors.pointer);
        }
      });
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.saveFlag = false;
    this.loadFlag = false;
    if (this.selectedChar !== null && this.selectedChar.position !== index) {
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
    if (!this.saveFlag) {
      const saveObj = new GameState(this.characterArr, this.balls, this.level);
      this.stateService.save(saveObj);
      this.saveFlag = true;
      GamePlay.showMessage("Игра загружена!");
    }
  }

  loadGame() {
    try {
      const loadObj = this.stateService.load();

      if (loadObj) {
        this.loadFlag = true;
        this.characterArr = loadObj.characterArr;
        this.level = loadObj.level;
        this.balls = loadObj.balls;
        this.init();
        this.events();
      }
    } catch (e) {
      GamePlay.showMessage("Failed!");
      this.newGame();
    }
  }
}
