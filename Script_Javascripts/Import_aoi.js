//    Introducir poligonos:
var forma1 = /* color: #00ffff */ee.Geometry.Polygon(
    [[[-0.7513560285377707, 39.81018161065039],
      [-1.1963023176002707, 39.565004588834434],
      [-0.8117808332252707, 39.335954294254286],
      [-0.4382456769752707, 39.39541004676887],
      [-0.4327525129127707, 39.79330080846793]]])
Map.addLayer(forma1)
//Forma 1: Pintando en mapa
//dibujar con herramientas (la variable region sería 'geometry')

//Forma 2: Poniendo coordenadas de vertices
var	Cuadro	=	ee.Feature(
           ee.Geometry.Polygon({
             coords: [[-1.0685072878919755, 39.7743142426891],
                      [-1.0685072878919755, 39.35932729335556],
                      [-0.33242330351697547, 39.35932729335556],
                      [-0.33242330351697547, 39.7743142426891]],
             geodesic: false,
             maxError: 1000
           }),{label:	'Cuadro'	})
//Map.addLayer(Cuadro,{min: 0, max: 1}, '2 Forma');

//Forma 3: Fusion tables
var Comunidad = ee.FeatureCollection('ft:1oqdcvye4mQD4NJ9kRWNEIYcmAgJT2Q_mdij0PtX6') //cambiar
print(Comunidad);
Map.addLayer(Comunidad,{min: 0, max: 1}, '3 Forma');

//Map.centerObject(Comunidad);

//filtrar
var clases = ee.FeatureCollection('ft:1S8qe1VhIFU429fMuOuYqHVA4I-4BoU-wHnCSdsO9');
//Map.addLayer(clases)
Map.centerObject(clases)
print(clases);
var clase1 =clases.filterMetadata('Cod_tesela', 'equals', 1);
var clase2 =clases.filterMetadata('Cod_tesela', 'equals', 2);
print(clase1);
print(clase2);
//Map.addLayer(clase1)
print(Var1)
Map.addLayer(Var1)
var extremadura = Var1.filterMetadata('Texto', 'equals', 'Extremadura');
Map.addLayer(extremadura)
