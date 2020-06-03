import "ol/ol.css";
import { Map, View } from "ol";

export const map = new Map({
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
