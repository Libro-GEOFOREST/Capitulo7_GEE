////////////////Colección de imágenes satelites/////////////////////////////////
var geometry = /* color: #bf04c2 */ee.Geometry.Point([-0.3833140363502707, 39.48873821945276]);
//1- consultar información (número objetos)
//Series Landsat
var L5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
.filterBounds(geometry).filter(ee.Filter.calendarRange(2000,2019,'year'));
print(L5);

var L7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
.filterBounds(geometry).filter(ee.Filter.calendarRange(2000,2019,'year'));
print(L7);

var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(geometry).filter(ee.Filter.calendarRange(2000,2019,'year'));
print(L8);
//Series Sentinel
var Sen2 = ee.ImageCollection('COPERNICUS/S2_SR')
.filterBounds(geometry).filter(ee.Filter.calendarRange(2000,2019,'year'));
print(Sen2);

var Sen3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
.filterBounds(geometry).filter(ee.Filter.calendarRange(2000,2019,'year'));
print(Sen3);

//Serie Modis
var Mod = ee.ImageCollection('MODIS/006/MOD09GQ')
.filterBounds(geometry).filter(ee.Filter.calendarRange(2018,2019,'year'));
print(Mod);

//2- representar mapas
var imagen1 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_199033_20190821')
Map.addLayer(imagen1,{ bands: 'B5,B4,B3',min: 0, max: 3000}, 'Landsat');

var imagen2 = ee.Image('COPERNICUS/S2_SR/20190908T105029_20190908T105028_T31SBD')
Map.addLayer(imagen2,{ bands: 'B5,B4,B3',min: 0, max: 3000}, 'Sentinel');

var imagen3 = ee.Image('MODIS/006/MOD09GQ/2019_09_08')
Map.addLayer(imagen3, { bands: ['sur_refl_b02', 'sur_refl_b02', 'sur_refl_b01'],min: -100.0, max: 8000.0}, 'Modis')

//////////////// imágenes no satelites (resolución 250m)/////////////////////////////
var ph =ee.Image("OpenLandMap/SOL/SOL_PH-H2O_USDA-4C1A2A_M/v02");
print(ph);
Map.addLayer(ph,{ bands:['b0'], min: 42,max: 100, 
                      palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                                '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                                '012E01', '011D01', '011301']},'Ph');

var textura= ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02");
print (textura);
Map.addLayer(textura,{bands:['b0'],min: 0,max: 12, 
                      palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
                                '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
                                '012E01', '011D01', '011301']},'Textura');

var flow = ee.Image('WWF/HydroSHEDS/15ACC');
print(flow);
var flowAccumulationVis = {min: 0.0, max: 500.0,
  palette: [
    '000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b',
    'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'
  ],
};
Map.addLayer(flow, flowAccumulationVis, 'Acumulación Flujo');

var elevación = ee.Image('WWF/HydroSHEDS/15CONDEM');
print(elevación)
var elevationVis = {
  min: -50.0,
  max: 3000.0,
  gamma: 2.0,
};
Map.addLayer(elevación, elevationVis, 'Elevación');

var clima = ee.ImageCollection('WORLDCLIM/V1/MONTHLY');
print(clima);
var precip = clima.select('prec');
var paleta_prec = {
  min: 0.0,
  max: 200,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
Map.addLayer(precip, paleta_prec, 'Precipitación');
