import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Raycaster from "./Raycaster/Raycaster.js";
import Level from "./Level/Level.js";
import Levelcolor from "./Levelcolor/Levelcolor.js";
import Pen from "./Pen/Pen.js";
import Entities from "./Entities/Entities.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Player: new Player({
    x: 6.287991633399996,
    y: -67.83913426319997,
    direction: -3,
    costumeNumber: 1,
    size: 150,
    visible: true,
    layerOrder: 6
  }),
  Raycaster: new Raycaster({
    x: 51.935190477618406,
    y: 23.37672640629321,
    direction: 26.584780486299298,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Level: new Level({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Levelcolor: new Levelcolor({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  Pen: new Pen({
    x: -236,
    y: -196,
    direction: 90,
    costumeNumber: 1,
    size: 31.771243072645376,
    visible: false,
    layerOrder: 4
  }),
  Entities: new Entities({
    x: 6,
    y: -64,
    direction: 90,
    costumeNumber: 1,
    size: 225,
    visible: false,
    layerOrder: 5
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
