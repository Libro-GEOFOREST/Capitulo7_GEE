///////////         Seminario de Google Earth Engine          ///////////
///////////              Javier Pérez Romero                  ///////////
///////////        Detect Masses of Water with Landsat        ///////////

//Area
var cuadrado =
    ee.Geometry.Polygon(
        [[[-1.190554909746993, 39.809881345656045],
          [-1.190554909746993, 39.07173876824307],
          [-0.22925119880949296, 39.07173876824307],
          [-0.22925119880949296, 39.809881345656045]]], null, false);
var geometry = /* color: #d63000 */ee.Geometry.Point([-1.1320734815500373, 39.03465932797495]);
var Comunidad = ee.FeatureCollection('ft:1oqdcvye4mQD4NJ9kRWNEIYcmAgJT2Q_mdij0PtX6');
Map.addLayer(Comunidad,{},'Comunidad Valenciana')
//imagen base
var Landsat = ee.ImageCollection('LANDSAT/LC8_L1T').filterDate('2016-01-01', '2018-01-01').filterBounds(Comunidad);
print(Landsat)
var imagen2 = ee.Algorithms.Landsat.simpleComposite({collection: Landsat, asFloat: true});
var imagen = imagen2.clipToCollection(Comunidad);
print(imagen, 'union')

//NDWI
var NDWI = imagen.normalizedDifference(['B3','B5']).rename('NDWI');
print(NDWI)
//Color
var colorndwi = {min: 0.0, max: 1.0, palette:['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff'],};
//Mapa
Map.addLayer(NDWI, colorndwi, 'NDWI')

//mascara
var mask = NDWI.updateMask(NDWI.gte(0.10));
print(mask)
Map.addLayer(mask, colorndwi, 'NDWI_mask')

//hacer banda con numero integro
var banda = mask.expression(
    'N/N', {
      'N': mask.select('NDWI')
});
banda = banda.toInt()
print(banda,'index')

// Convert the zones to vectors.

var vectors = banda.reduceToVectors({
  geometry: cuadrado,
  crs: mask.projection(),
  scale: 30,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  maxPixels: 5000000000
});
print(vectors)
var display = ee.Image(0).updateMask(0).paint(vectors, '000000', 3);
Map.addLayer(display, {palette: '000000'}, 'Water_Bodies');
Map.centerObject(cuadrado, 10)

//Export Drive
//Export vector of burned areas to Google Drive
Export.table.toDrive({
 collection: vectors,
 description:'Water_bodies',
 folder: 'curso_gee',
 fileFormat: 'kML'
});

//Export layer NBR to Google Drive
Export.image.toDrive({
  image: mask,
  description: 'raster_water',
  folder: 'curso_gee',
  scale: 30,
  region: geometry,
  maxPixels: 1e8
});

///////area
//raster_area
var area = mask.multiply(ee.Image.pixelArea())
print(area,'area')

//shape_area
var areas = area.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: vectors,
  scale: 30,
  maxPixels:1e13
})
print(areas)

//histograma
var series = ui.Chart.image.histogram(
area, vectors, 30)
.setChartType('ScatterChart')
.setOptions({
title: 'Area',
vAxis: {title: 'polygn'},
lineWidth: 1,
pointSize: 4,
});
print(series)
