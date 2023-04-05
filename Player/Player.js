/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Player", "./Player/costumes/Player.svg", {
        x: 8.943893351981501,
        y: 6.506129712035147
      }),
      new Costume("Hitbox", "./Player/costumes/Hitbox.png", { x: 4, y: 4 })
    ];

    this.sounds = [new Sound("Meow", "./Player/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.fov = 60;
    this.stage.vars.res = 8;
    this.effects.ghost = 0;
    this.size = 150;
    this.goto(20, -25);
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    this.direction = 45;
    this.costume = "Player";
    while (true) {
      yield* this.playertick();
      yield* this.raycastInit();
      this.broadcast("Raycast");
      this.broadcast("Entity Tick");
      this.broadcast("Paint");
      yield;
    }
  }

  *move2(steps) {
    this.costume = "Hitbox";
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.warp(this.tryMove)(
      this.toNumber(steps) * Math.sin(this.degToRad(this.direction)),
      0
    );
    this.warp(this.tryMove)(
      0,
      this.toNumber(steps) * Math.cos(this.degToRad(this.direction))
    );
    this.costume = "Player";
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
  }

  *tryMove(dx, dy) {
    this.x += this.toNumber(dx);
    this.y += this.toNumber(dy);
    if (this.touching(this.sprites["Level"].andClones())) {
      this.x += 0 - this.toNumber(dx);
      this.y += 0 - this.toNumber(dy);
    }
  }

  *playertick() {
    if (this.keyPressed("left arrow")) {
      this.direction -= 3;
    }
    if (this.keyPressed("right arrow")) {
      this.direction += 3;
    }
    if (this.keyPressed("w")) {
      this.warp(this.move2)(2);
    }
    if (this.keyPressed("s")) {
      this.warp(this.move2)(-2);
    }
    if (this.keyPressed("a")) {
      this.direction -= 90;
      this.warp(this.move2)(2);
      this.direction += 90;
    }
    if (this.keyPressed("d")) {
      this.direction += 90;
      this.warp(this.move2)(2);
      this.direction -= 90;
    }
  }

  *raycastInit() {
    this.stage.vars.cameraDir = this.direction;
    this.stage.vars.dv =
      240 / this.scratchTan(this.toNumber(this.stage.vars.fov) / 2);
    this.stage.vars.drawDist = [];
    this.stage.vars.drawX = [];
    this.stage.vars.drawType = [];
    this.stage.vars.drawDist.push(999999);
    this.stage.vars.drawX.push("");
    this.stage.vars.drawType.push("");
    this.stage.vars.drawIdx = 2;
  }
}
