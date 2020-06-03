import "./styles.css";
import { loadGeoPackage } from "./geopackage";
import { map } from "./map";

document.getElementById("gpkg").addEventListener("change", loadGeoPackage);
map.setTarget("map");
