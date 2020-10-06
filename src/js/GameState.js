export default class GameState {
  static from(object) {
    // TODO:
    if (typeof object === "object") return object;
    return null;
  }
}
