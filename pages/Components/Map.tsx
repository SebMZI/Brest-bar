import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {
  interface Bar {
    name: string;
    location: {
      coordinates: [number, number];
    };
    status: string;
    // Add other properties if necessary
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
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const fetchMapData = async (): Promise<Bar[]> => {
    try {
      const response = await fetch("https://api.brest.bar/items/bars");
      const result = await response.json();
      return result.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibnJhenppIiwiYSI6ImNscG41ZGo2ZTBmazUydHF5NjRkazZ3ajYifQ.4IwRGafBMBLFKakIk_IlPQ";

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-4.486076, 48.390394],
        zoom: 13,
      });

      const data = await fetchMapData();
      const operationalBars = data.filter(
        (bar) => bar.status === "OPERATIONAL"
      );
      console.log(operationalBars);

      map.on("load", () => {
        map.addSource("bars", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: operationalBars.map((bar: Bar) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: bar.location.coordinates,
              },
              properties: {
                name: bar.name,
              },
            })),
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

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
        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });

          if (!features || features.length === 0) {
            return;
          }

          const clusterId = features[0].properties.cluster_id;
          map
            .getSource("bars")
            ?.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates as [number, number],
                zoom: zoom as number,
              });
            });
        });
        setMap(map);
      });

      return () => map.remove();
    };

    initializeMap();
  }, []);

  return <div id="map" className="h-full basis-2/3"></div>;
};

export default Map;
