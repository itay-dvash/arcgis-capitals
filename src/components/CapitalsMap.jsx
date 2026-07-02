import { useState, useRef, useEffect } from "react";
import Legend from "./Legend.jsx";
import { POPULATION_BREAKS, MARKER_COLOR } from "../data/populationBreaks.js";
import styles from "./CapitalsMap.module.css";

// Register ArcGIS Web Components with the browser
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-expand";

// Import core ArcGIS API classes for map configuration
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import PopupTemplate from "@arcgis/core/PopupTemplate.js";

// Hosted feature layer ID for "World National Capital Cities"
const CAPITALS_ITEM_ID = "d9677f2ef1d547c29fc30e628596f0c0";

// Static map configuration values
const INITIAL_CENTER = [35.2, 31.7]; // Israel
const VIEW_ZOOM = 6;
const VIEW_CONSTRAINTS = { minZoom: 2 };

/**
 * Generates a ClassBreaksRenderer based on city population thresholds
 */
function buildRenderer() {
  const classBreakInfos = POPULATION_BREAKS.map((brk) => ({
    minValue: brk.minValue,
    maxValue: brk.maxValue === Infinity ? 999_999_999 : brk.maxValue,
    symbol: new SimpleMarkerSymbol({
      color: [...MARKER_COLOR],
      outline: {
        color: [255, 255, 255, 0.3],
        width: brk.size > 12 ? 1.5 : 1,
      },
      size: `${brk.size}px`,
    }),
    label: brk.label,
  }));

  return new ClassBreaksRenderer({
    field: "POP",
    classBreakInfos,
  });
}

/**
 * Generates popup template for capital population details
 */
function buildPopupTemplate(isDark) {
  const icon = isDark ? "🌆" : "🏙️";
  return new PopupTemplate({
    title: `${icon} {CITY_NAME} (capital of {CNTRY_NAME})`,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "POP",
            label: "Population",
            format: { digitSeparator: true, places: 0 },
          },
        ],
      },
    ],
  });
}

/**
 * Main Component
 */
export default function CapitalsMap({ isDark }) {
  // --- Initialization & Lifecycle Data ---
  const [mapReady, setMapReady] = useState(false);      // Tracks if map element is initialized
  const [layerReady, setLayerReady] = useState(false);  // Tracks if the layer has finished loading

  // --- UI & View Data ---
  const [error, setError] = useState(null);             // Error messages for display
  const [expanded, setExpanded] = useState(true);       // Tracks legend panel visibility
  const capitalsLayerRef = useRef(null);                // Reference to the layer for dynamic updates

  // --- Derived Values ---
  const loading = !mapReady || !layerReady;             // Aggregated loading status

  /**
   * Initializes the map layer and view event listeners once the GIS view is ready
   */
  function handleViewReady(e) {
    // Access the Web-Component element that triggered the view-ready event
    const mapEl = e.target;

    // Configure the docked popup behavior
    mapEl.popup = {
      dockEnabled: true,
      dockOptions: {
        breakpoint: false, // Disable auto-floating; keep it docked always
        position: "bottom-right", // Pins the popup to the bottom-right corner
      },
    };

    // Instantiate the capital cities Feature-Layer
    const capitalsLayer = new FeatureLayer({
      portalItem: { id: CAPITALS_ITEM_ID },
      outFields: ["CITY_NAME", "POP"],
      renderer: buildRenderer(),
      popupTemplate: buildPopupTemplate(isDark),
      title: "Capitals of the World",
    });
    capitalsLayerRef.current = capitalsLayer;
    mapEl.map.add(capitalsLayer);

    // Attempt to load the layer and handle success/failure scenarios
    capitalsLayer.when(
      () => setLayerReady(true),
      (err) => {
        console.error("Capitals layer failed to load:", err);
        setError(
          "Could not load the capitals layer. Please try to refresh the page.",
        );
      },
    );

    // Change cursor to pointer when hovering a capital marker
    mapEl.view.on("pointer-move", (moveEvent) => {
      mapEl.view.hitTest(moveEvent).then((response) => {
        const hit = response.results.some((r) => r.layer === capitalsLayer);
        mapEl.view.container.style.cursor = hit ? "pointer" : "default";
      });
    });

    // Update state to indicate the map initialization is complete
    setMapReady(true);
  }

  // Sync the popup template with the theme whenever it changes
  useEffect(() => {
    if (capitalsLayerRef.current) {
      capitalsLayerRef.current.popupTemplate = buildPopupTemplate(isDark);
    }
  }, [isDark]);

  return (
    <div className={styles.mapContainer}>
      <arcgis-map
        className={styles.mapEl}
        basemap={isDark ? "dark-gray-vector" : "gray-vector"}
        center={INITIAL_CENTER}
        zoom={VIEW_ZOOM}
        constraints={VIEW_CONSTRAINTS}
        onarcgisViewReadyChange={handleViewReady}
      >
        <arcgis-zoom slot="top-left" />
        <arcgis-expand
          slot="bottom-left"
          expandIcon="legend"
          expanded={!loading && !error && expanded}
          onClick={(e) => setExpanded(e.target.expanded)}
        >
          <Legend />
        </arcgis-expand>
      </arcgis-map>

      {loading && !error && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <p>Loading map...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorOverlay}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
