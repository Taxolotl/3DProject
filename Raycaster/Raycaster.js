/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Raycaster extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Hitbox", "./Raycaster/costumes/Hitbox.png", { x: 4, y: 4 })
    ];

    this.sounds = [new Sound("Meow", "./Raycaster/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Raycast" },
        this.whenIReceiveRaycast
      )
    ];

    this.vars.x = 244;
    this.vars.distance = 88.70186269980002;
    this.vars.scanLines = 60;
  }

  *whenGreenFlagClicked() {
    this.effects.ghost = 100;
    this.costume = "Hitbox";
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
  }

  *singeRay() {
    this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
    while (!this.touching(this.sprites["Level"].andClones())) {
      this.move(4);
    }
    while (!!this.touching(this.sprites["Level"].andClones())) {
      this.move(-0.5);
    }
    this.vars.distance = Math.hypot(
      this.sprites["Player"].x - this.x,
      this.sprites["Player"].y - this.y
    );
    if (this.toNumber(this.stage.vars.fisheye) === 0) {
      this.vars.distance =
        this.toNumber(this.vars.distance) *
        Math.cos(
          this.degToRad(
            this.direction - this.toNumber(this.stage.vars.cameraDir)
          )
        );
    }
    if (this.touching(this.sprites["Levelcolor"].andClones())) {
      this.warp(this.drawAtXDist)(159, this.vars.x, this.vars.distance);
    } else {
      this.warp(this.drawAtXDist)(154, this.vars.x, this.vars.distance);
    }
  }

  *whenIReceiveRaycast() {
    yield* this.raycast();
  }

  *raycast() {
    this.vars.x = this.toNumber(this.stage.vars.res) / 2 - 240;
    this.vars.scanLines = 480 / this.toNumber(this.stage.vars.res);
    for (let i = 0; i < this.toNumber(this.vars.scanLines); i++) {
      this.direction =
        this.toNumber(this.stage.vars.cameraDir) +
        this.radToDeg(
          Math.atan(
            this.toNumber(this.vars.x) / this.toNumber(this.stage.vars.dv)
          )
        );
      this.warp(this.singeRay)();
      this.vars.x += this.toNumber(this.stage.vars.res);
    }
  }

  *drawAtXDist(type, x, dist) {
    while (
      !(
        this.compare(
          this.itemOf(
            this.stage.vars.drawDist,
            this.toNumber(this.stage.vars.drawIdx) - 2
          ),
          dist
        ) > 0
      )
    ) {
      this.stage.vars.drawIdx--;
    }
    while (
      !(
        this.compare(
          dist,
          this.itemOf(this.stage.vars.drawDist, this.stage.vars.drawIdx - 1)
        ) > 0
      )
    ) {
      this.stage.vars.drawIdx++;
    }
    this.stage.vars.drawDist.splice(this.stage.vars.drawIdx - 1, 0, dist);
    this.stage.vars.drawType.splice(this.stage.vars.drawIdx - 1, 0, type);
    this.stage.vars.drawX.splice(this.stage.vars.drawIdx - 1, 0, x);
  }
}
