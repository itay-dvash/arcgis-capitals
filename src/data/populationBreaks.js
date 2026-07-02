/**
 * populationBreaks.js
 *
 * Single source of truth for the population classification used by:
 * - The ArcGIS ClassBreaksRenderer (components/CapitalsMap.jsx)
 * - The custom Legend component (components/Legend.jsx)
 *
 * @typedef {Object} PopulationBreak
 * @property {number} minValue - Numeric range lower bound (inclusive)
 * @property {number} maxValue - Numeric range upper bound (inclusive)
 * @property {number} size - Marker diameter in pixels (used for map symbols and legend swatches)
 * @property {string} label - Primary text shown in the legend
 * @property {string} sublabel - Secondary descriptive text shown in the legend
 */
export const POPULATION_BREAKS = [
  {
    minValue: 0,
    maxValue: 499_999,
    size: 8,
    label: "Under 500,000",
    sublabel: "Small city",
  },
  {
    minValue: 500_000,
    maxValue: 999_999,
    size: 14,
    label: "500,000 - 1,000,000",
    sublabel: "Medium city",
  },
  {
    minValue: 1_000_000,
    maxValue: 4_999_999,
    size: 20,
    label: "1,000,000 - 5,000,000",
    sublabel: "Large city",
  },
  {
    minValue: 5_000_000,
    maxValue: Infinity,
    size: 26,
    label: "Over 5,000,000",
    sublabel: "Central metropolis",
  },
];

/** Marker color: Red (RGB format, required by assignment) */
export const MARKER_COLOR = [230, 57, 70];
