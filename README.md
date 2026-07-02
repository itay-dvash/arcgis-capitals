# 🌍 World Capitals GIS Explorer

A modern React-based GIS web application built with the ArcGIS Maps SDK for JavaScript. This project demonstrates the integration of spatial data, dynamic symbology, and responsive UI/UX principles.

## ✨ Features

#### **Interactive Map**
Centers initially on Israel and displays a global layer of capital cities.

#### **Dynamic Symbology**
Capital cities are rendered with red markers (RGB format), sized proportionally to their population across four distinct categories.

#### **Smart Popups**
Clicking a city reveals a clean, focused popup displaying exactly two data points: the city's name and its population.

#### **Theme Toggle**
A seamless UI switch that initializes based on the user's browser system preference, while allowing for manual toggling

#### **Custom Legend**
A highly organized, collapsible legend detailing the population classification breaks.

#### **Loading Spinner**
A visual indicator displayed during initial startup to ensure a polished user experience.

## 📁 Architecture Overview

* src/components/: Modular UI elements with scoped CSS Modules.
* src/data/: Static configurations serving as the single source of truth.
* src/App.jsx: The App Shell orchestrating the entire application flow.

## 🛠️ Tech Stack

* Framework: React 19.2.7
* Build Tool: Vite
* GIS Engine: ArcGIS Maps SDK for JavaScript
* UI Components: Esri Calcite Components
* Styling: CSS Modules

## 🚀 Getting Started

Follow these instructions to run a copy of the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Git](https://git-scm.com/) (v2.x+)

### Installation & Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/itay-dvash/arcgis-capitals
    cd arcgis-capitals
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

Once everything is up and running, you can view the application by navigating to the local URL provided in the terminal (usually http://localhost:5173).

---
*Developed as part of a professional employment assessment.*