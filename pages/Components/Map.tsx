import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { features } from "process";

interface Bar {
  name: string;
  location: {
    coordinates: [number, number];
  };
  status: string;
}

interface features {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    name: string;
  };
}

const Map = ({
  data,
  location,
  zoom,
}: {
  data?: Bar[];
  location: [number, number];
  zoom: number;
}) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibnJhenppIiwiYSI6ImNscG41ZGo2ZTBmazUydHF5NjRkazZ3ajYifQ.4IwRGafBMBLFKakIk_IlPQ";

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: location,
        zoom: zoom,
      });
      if (data) {
        map.on("load", () => {
          map.addSource("bars", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features:
                data.map((bar: Bar) => ({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: bar.location.coordinates,
                  },
                  properties: {
                    name: bar.name,
                  },
                })) || [],
            },
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });

          new mapboxgl.Marker().setLngLat(location).addTo(map);

          map.addLayer({
            id: "clusters",
            type: "circle",
            source: "bars",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#BF84F5",
                100,
                "#8C51C2",
                750,
                "#8C51C2",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40,
              ],
            },
          });

          map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "bars",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          map.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "bars",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#BF84F5",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            },
          });
          map.on("click", "clusters", (e: mapboxgl.MapLayerMouseEvent) => {
            const features = map.queryRenderedFeatures(e.point, {
              layers: ["clusters"],
            }) as mapboxgl.MapboxGeoJSONFeature[];

            const clusterId = features[0].properties?.cluster_id;

            // Assurez-vous que clusterId est défini avant de continuer
            if (clusterId === undefined) {
              return;
            }

            // Ease the camera to the next cluster expansion
            const source = map.getSource("bars") as mapboxgl.GeoJSONSource;
            source.getClusterExpansionZoom(
              clusterId,
              (err: any, zoom: number) => {
                if (!err) {
                  const geometry = features[0].geometry;
                  if (geometry.type === "Point") {
                    const pointCoordinates = (geometry as GeoJSON.Point)
                      .coordinates;
                    // Maintenant, vous pouvez utiliser pointCoordinates en toute sécurité
                    map.easeTo({
                      center: pointCoordinates as [number, number],
                      zoom,
                    });
                  } else {
                    // Gérez le cas où la géométrie n'est pas un Point
                    console.error("La géométrie n'est pas un Point.");
                  }
                }
              }
            );
          });
          map.dragRotate.disable();
          setMap(map);
        });
        map.on("click", "unclustered-point", (e) => {
          console.log(e);
          console.log(e.lngLat.lng, e.lngLat.lat);
        });
      }

      return () => map.remove();
    };

    initializeMap();
  }, [data, location]);

  return (
    <div
      id="map"
      className="!absolute top-0 left-0 h-screen w-screen bg-gray-secondary mapboxgl-map"
    ></div>
  );
};

export default Map;
