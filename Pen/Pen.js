/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Pen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Costume 1", "./Pen/costumes/Costume 1.svg", {
        x: 99.94389675271242,
        y: 99.94388675271263
      })
    ];

    this.sounds = [new Sound("pop", "./Pen/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Paint" }, this.whenIReceivePaint)
    ];

    this.vars.distance = 10.87032631124999;
    this.vars.height = 382.4100417103856;
    this.vars.x = -236;
    this.vars.row = 63;
    this.vars.type = 159;
  }

  *draw() {
    this.clearPen();
    this.penSize = this.toNumber(this.stage.vars.res);
    this.penColor.h = 53;
    this.vars.row = 1;
    for (let i = 0; i < this.stage.vars.drawX.length; i++) {
      this.warp(this.drawRow)();
      this.vars.row++;
    }
  }

  *whenIReceivePaint() {
    this.visible = false;
    yield* this.draw();
  }

  *drawRow() {
    this.vars.type = this.itemOf(this.stage.vars.drawType, this.vars.row - 1);
    this.vars.x = this.itemOf(this.stage.vars.drawX, this.vars.row - 1);
    this.vars.distance = this.itemOf(
      this.stage.vars.drawDist,
      this.vars.row - 1
    );
    this.vars.height =
      10 *
      (this.toNumber(this.stage.vars.dv) / this.toNumber(this.vars.distance));
    if (this.compare(this.vars.type, 10) < 0) {
      this.warp(this.stampEntity)();
      return;
    }
    this.penColor.h = this.toNumber(this.vars.type);
    this.penColor.v =
      120 -
      this.toNumber(this.vars.distance) / this.toNumber(this.stage.vars.shader);
    this.goto(this.toNumber(this.vars.x), this.toNumber(this.vars.height));
    this.penDown = true;
    this.y = 0 - this.toNumber(this.vars.height);
    this.penDown = false;
  }

  *stampEntity() {
    this.size = this.toNumber(this.vars.height);
    this.costume = this.vars.type;
    this.goto(this.toNumber(this.vars.x), 0);
    this.effects.brightness =
      40 -
      this.toNumber(this.vars.distance) / this.toNumber(this.stage.vars.shader);
    this.stamp();
  }
}
