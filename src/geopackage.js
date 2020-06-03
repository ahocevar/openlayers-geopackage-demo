import { open, getTileFromXYZ } from "@ngageoint/geopackage";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { map } from "./map";

export const loadGeoPackage = function (e) {
  var f = e.target.files[0];
  var r = new FileReader();
  r.onload = function () {
    var array = new Uint8Array(r.result);
    loadByteArray(array);
  };
  r.readAsArrayBuffer(f);
};

function loadByteArray(array, callback) {
  open(array, function (err, geoPackage) {
    const tileTableNames = geoPackage.getTileTables();
    const tableLayer = new TileLayer({
      source: new XYZ({
        wrapX: false,
        url: "{z},{x},{y}",
        tileLoadFunction(tile, src) {
          const [z, x, y] = src.split(",").map(Number);
          getTileFromXYZ(geoPackage, tileTableNames[0], x, y, z, 256, 256).then(
            (dataUri) => {
              tile.getImage().src = dataUri;
            }
          );
        },
      }),
    });
    map.addLayer(tableLayer);
  });
}
