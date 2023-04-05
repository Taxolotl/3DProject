/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Entities extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Hitbox", "./Entities/costumes/Hitbox.png", { x: 4, y: 4 })
    ];

    this.sounds = [new Sound("pop", "./Entities/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Entity Tick" },
        this.whenIReceiveEntityTick
      )
    ];

    this.vars.vx = 3.848945180805712;
    this.vars.vy = 3.8391342631999663;
    this.vars.type = 0;
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
          this.itemOf(this.stage.vars.drawDist, this.stage.vars.drawIdx - 1),
          dist
        ) < 0
      )
    ) {
      this.stage.vars.drawIdx++;
    }
    this.stage.vars.drawDist.splice(this.stage.vars.drawIdx - 1, 0, dist);
    this.stage.vars.drawType.splice(this.stage.vars.drawIdx - 1, 0, type);
    this.stage.vars.drawX.splice(this.stage.vars.drawIdx - 1, 0, x);
  }

  *whenGreenFlagClicked() {
    this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
    this.size = 225;
    this.goto(60, 10);
    this.effects.ghost = 0;
    /* TODO: Implement sensing_setdragmode */ null;
    yield* this.spawnOf(2, 1);
  }

  *whenIReceiveEntityTick() {
    this.vars.vx = this.x - this.sprites["Player"].x;
    this.vars.vy = this.y - this.sprites["Player"].y;
    yield* this.rotateView(this.vars.vx, this.vars.vy);
  }

  *rotateView(x, y) {
    this.vars.vx =
      this.toNumber(x) *
        Math.cos(this.degToRad(this.toNumber(this.stage.vars.cameraDir))) -
      this.toNumber(y) *
        Math.sin(this.degToRad(this.toNumber(this.stage.vars.cameraDir)));
    this.vars.vx =
      this.toNumber(x) *
        Math.sin(this.degToRad(this.toNumber(this.stage.vars.cameraDir))) +
      this.toNumber(y) *
        Math.cos(this.degToRad(this.toNumber(this.stage.vars.cameraDir)));
    if (this.compare(this.vars.vy, 20) > 0) {
      this.warp(this.drawAtXDist)(
        1,
        this.toNumber(this.vars.vx) *
          (this.toNumber(this.stage.vars.dv) / this.toNumber(this.vars.vy)),
        this.vars.vy
      );
    }
  }

  *spawnOf(count, type) {
    this.visible = true;
    this.vars.type = type;
    for (let i = 0; i < this.toNumber(count); i++) {
      this.goto(this.random(-240, 240), this.random(-180, 180));
      while (
        !!(
          this.touching(this.sprites["Level"].andClones()) ||
          this.touching(this.sprites["Entities"].andClones())
        )
      ) {
        this.goto(this.random(-240, 240), this.random(-180, 180));
      }
      this.createClone();
    }
    this.vars.type = "";
    this.visible = false;
  }
}
