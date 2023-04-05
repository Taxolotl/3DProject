/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 244.30557250976562,
        y: 185.01043166666668
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.fov = 60;
    this.vars.res = 8;
    this.vars.shader = 1.36;
    this.vars.fisheye = 0;
    this.vars.cameraDir = -3;
    this.vars.dv = 415.6921938090611;
    this.vars.drawIdx = 13;
    this.vars.drawX = [
      0,
      12,
      20,
      28,
      44,
      36,
      52,
      60,
      68,
      76,
      84,
      4,
      394.38565892649797,
      92,
      -4,
      100,
      108,
      116,
      124,
      132,
      140,
      148,
      156,
      164,
      188,
      172,
      196,
      180,
      204,
      220,
      236,
      212,
      228,
      -12,
      -20,
      -28,
      -36,
      -44,
      -52,
      -60,
      -68,
      -76,
      -84,
      -92,
      -100,
      -108,
      -116,
      -124,
      -132,
      -140,
      -148,
      -156,
      -164,
      -172,
      -180,
      -188,
      -196,
      -204,
      -212,
      -220,
      -228,
      -236
    ];
    this.vars.drawDist = [
      999999,
      241.8992296511999,
      241.72039274020005,
      241.45287955139997,
      241.15286014425016,
      241.09757299760008,
      240.6246429582501,
      240.50762641979995,
      240.30602050784995,
      240.02150248119983,
      239.65597842059998,
      158.49266254364997,
      130.83913426319998,
      113.74754044205001,
      109.49493090554999,
      102.08761843349998,
      92.43137843350002,
      90.05925375314997,
      89.59862885489996,
      89.59155361479999,
      89.55733131765002,
      89.49690928349996,
      89.4112714209,
      89.30143119359998,
      89.29270850640002,
      89.16842482305,
      89.09322764049998,
      89.01330474349999,
      88.87476568410003,
      88.82707665449998,
      88.70186269980002,
      88.63838844260002,
      88.55448164599996,
      83.46523006560001,
      67.42201037174999,
      56.37226320105002,
      48.817277177200026,
      42.76112571630003,
      38.20226290265001,
      34.146144491700014,
      31.086815794649986,
      28.52714578670001,
      26.46507737159998,
      24.409343442499985,
      22.848181268449988,
      21.293092414000014,
      20.227212072899963,
      19.16548210799996,
      18.108931049800006,
      17.058539298599978,
      16.486272762749987,
      15.4480207167,
      14.883571865600013,
      14.322389479350003,
      13.764944032500011,
      13.211676258599995,
      12.662996822000002,
      12.119286229650001,
      12.026314009800002,
      11.490069617000023,
      10.959713074999996,
      10.87032631124999
    ];
    this.vars.drawType = [
      0,
      154,
      154,
      154,
      154,
      154,
      154,
      154,
      154,
      154,
      154,
      159,
      1,
      154,
      159,
      154,
      154,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159,
      159
    ];

    this.watchers.fov = new Watcher({
      label: "FOV",
      style: "slider",
      visible: true,
      value: () => this.vars.fov,
      setValue: value => {
        this.vars.fov = value;
      },
      step: 1,
      min: 30,
      max: 120,
      x: 240,
      y: 180
    });
    this.watchers.res = new Watcher({
      label: "RES",
      style: "slider",
      visible: true,
      value: () => this.vars.res,
      setValue: value => {
        this.vars.res = value;
      },
      step: 1,
      min: 4,
      max: 16,
      x: 583,
      y: 180
    });
    this.watchers.shader = new Watcher({
      label: "Shader",
      style: "slider",
      visible: true,
      value: () => this.vars.shader,
      setValue: value => {
        this.vars.shader = value;
      },
      step: 0.01,
      min: 0.5,
      max: 5,
      x: 245,
      y: 137
    });
    this.watchers.fisheye = new Watcher({
      label: "Fisheye",
      style: "slider",
      visible: true,
      value: () => this.vars.fisheye,
      setValue: value => {
        this.vars.fisheye = value;
      },
      step: 1,
      min: 0,
      max: 1,
      x: 245,
      y: 94
    });
  }
}
