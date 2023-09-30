//SUBIRLO A SANDBOX

//BUSQUEDA DE PROYECTO: PASAR EL TITULO DEL PROYECTO Y BUSCAR PRIMERO LOS INVESTIGADORES DE UN PROYECTO Y LUEGO LAS PUBLICACIONES RELACIONADAS (separarlas)
//BUSQUEDA DE PUBLICACIONES, AREA: separarlos, primero proyectos y luego publicaciones (se buscan por nombre de area)
//BUSQUEDA DE COLEGAS: SOLO DEVOLVER DATOS DE LOS COLEGAS

//*****Carga de tablas*****
//Cargar investigadores
LOAD CSV WITH HEADERS FROM 'file:///investigadores.csv' AS row
CREATE (:Investigador {
  id: toInteger(row.id),
  nombre_completo: row.nombre_completo,
  titulo_academico: row.titulo_academico,
  institucion: row.institucion,
  email: row.email
});

//Cargar Proyectos
LOAD CSV WITH HEADERS FROM 'file:///proyectos.csv' AS row
CREATE (:Proyecto {
  idPry: toInteger(row.idPry),
  titulo_proyecto: row.titulo_proyecto,
  anno_inicio: toInteger(row.anno_inicio),
  duracion_meses: toInteger(row.duracion_meses),
  area_conocimiento: row.area_conocimiento
});

//Cargar publicaciones
LOAD CSV WITH HEADERS FROM 'file:///publicaciones.csv' AS row
CREATE (:Publicacion {
  idPub: toInteger(row.idPub),
  titulo_publicacion: row.titulo_publicacion,
  anno_publicacion: toInteger(row.anno_publicacion),
  nombre_revista: row.nombre_revista
});

//Cargar investigadores asociados a proyectos
LOAD CSV WITH HEADERS FROM 'file:///InvestigadoresProy.csv' AS row
MATCH (investigador:Investigador {id: toInteger(row.idInv)})
MATCH (proyecto:Proyecto {idPry: toInteger(row.idProy)})
CREATE (investigador)-[:TRABAJA_EN]->(proyecto);

//Cargar publicaciones asociadas a proyectos
LOAD CSV WITH HEADERS FROM 'file:///PublicacionesProy.csv' AS row
MATCH (proyecto:Proyecto {idPry: toInteger(row.idProyecto)})
MATCH (publicacion:Publicacion {idPub: toInteger(row.idArt)})
CREATE (publicacion)-[:REALIZADA_EN]->(proyecto);

//*****Agregar datos a los grafos*****

//Agregar investigador
MATCH (i:Investigador)
WITH COALESCE(MAX(i.id), 0) AS max_id
CREATE (nuevoInvestigador:Investigador {
  id: max_id + 1,
  nombre_completo: 'Nuevo Investigador',
  titulo_academico: 'Título',
  institucion: 'Institución',
  email: 'correo@ejemplo.com'
})
RETURN nuevoInvestigador;

//Agregar proyecto nuevo
MATCH (p:Proyecto)
WITH COALESCE(MAX(p.idPry), 0) AS max_id
CREATE (nuevoProyecto:Proyecto {
  idPry: max_id + 1,
  titulo_proyecto: 'Nuevo Proyecto',
  anno_inicio: 2023,  
  duracion_meses: 12, 
  area_conocimiento: 'Área de Conocimiento'
})
RETURN nuevoProyecto;

//Agregar publicaciones nuevas
MATCH (p:Publicacion)
WITH COALESCE(MAX(p.idPub), 0) AS max_id
CREATE (nuevaPublicacion:Publicacion {
  idPub: max_id + 1,
  titulo_publicacion: 'Nuevo Título',
  anno_publicacion: 2023,
  nombre_revista: 'Nombre de la Revista'
})
RETURN nuevaPublicacion;


//*****Actualizacion de datos*****
//Actualiza los valores de una publicacion por su ID
MATCH (p:Publicacion {idPub: 1})
SET p.titulo_publicacion = 'Nuevo titulo',
    p.anno_publicacion = 2023,
    p.nombre_revista = 'Nombre revista';

//Actualiza los valores de un proyecto por su ID
MATCH (p:Proyecto {idPry: 1})
SET p.titulo_proyecto = 'Nuevo Título',
    p.anno_inicio = 2023,
    p.duracion_meses = 12,
    p.area_conocimiento = 'Nueva Área';

//Actualiza los valores de un investigador por su ID
MATCH (i:Investigador {id: 1})
SET i.nombre_completo = 'Nuevo Nombre',
    i.titulo_academico = 'Nuevo Título Académico',
    i.institucion = 'Nueva Institución',
    i.email = 'nuevo_email@example.com';

//Actualiza los valores de un investigador por su ID
MATCH (i:Investigador {nombre_completo: 'nombre investigador'})
SET i.titulo_academico = 'Nuevo Título Académico',
    i.institucion = 'Nueva Institución',
    i.email = 'nuevo_email@example.com';



//*****Busqueda de datos generales*****
//Busqueda de TODOS los investigadores
MATCH (i:Investigador)
RETURN DISTINCT i;

//Busqueda de TODOS los proyectos
MATCH (p:Proyecto)
RETURN p;

//Busqueda de TODAS las publicaciones
MATCH (p:Publicacion)
RETURN p;

//*****Busqueda de datos especificos*****
//Devuelve solo los titulos de los proyectos
MATCH (p:Proyecto)
RETURN p.titulo_proyecto;

//Devuelve solo las areas de conocimiento de los proyectos
MATCH (p:Proyecto)
RETURN p.area_conocimiento;

//Devuelve los nombres de los investigadores
MATCH (i:Investigador)
RETURN i.nombre_completo;

//Busqueda de investigador por nombre que devuelve toda su info y los proyectos donde participa
MATCH (i:Investigador {nombre_completo: 'Nombre Investigador'})-[:TRABAJA_EN]->(p:Proyecto)
WITH i, COLLECT({idProy: p.idPry, tituloProyecto: p.titulo_proyecto, annoInicio: p.anno_inicio, duracionMeses: p.duracion_meses, areaConocimiento: p.area_conocimiento}) AS proyectos
RETURN i.id, i.titulo_academico, i.institucion, i.email, proyectos;

//Busqueda de proyectos a partir de su nombre, devuelve info del proyecto, de los investigadores y de las publicaciones asociadas
MATCH (p:Proyecto {titulo_proyecto: 'Titulo Proyecto'})
RETURN p.idPry, p.anno_inicio, p.duracion_meses, p.area_conocimiento AS proyecto,
       [(i:Investigador)-[:TRABAJA_EN]->(p) | {nombre_completo: i.nombre_completo, titulo_academico: i.titulo_academico, institucion: i.institucion, email: i.email}] AS investigadores,
       [(pb:Publicacion)-[:REALIZADA_EN]->(p) | {titulo_publicacion: pb.titulo_publicacion, anno_publicacion: pb.anno_publicacion, nombre_revista: pb.nombre_revista}] AS publicaciones;

//Busqueda de publicaciones a partir de su titulo, devuelve informacion de estas y el nombre de los proyectos asociados
MATCH (pb:Publicacion {titulo_publicacion: 'Titulo Publicacion'})-[:REALIZADA_EN]->(p:Proyecto)
RETURN pb.idPub, pb.anno_publicacion, pb.nombre_revista, p.titulo_proyecto;

//Busqueda de area de conocimiento por nombre del area, devuelve el nombre del area de conocimiento, los nombres de los proyectos asociados y de las publicaciones del area
MATCH (p:Proyecto {area_conocimiento: 'Nombre area conocimiento'})<-[:REALIZADA_EN]-(pb:Publicacion)
RETURN DISTINCT p.area_conocimiento AS area_conocimiento,
       COLLECT(DISTINCT p.titulo_proyecto) AS proyectos,
       COLLECT(DISTINCT pb.titulo_publicacion) AS publicaciones;

//Busqueda de colegas de un investigador a partir de su nombre, devuelve la informacion del investigador y el nombre de los investigadores con los que ha trabajado en otros proyectos.
MATCH (i:Investigador {nombre_completo: 'Nombre investigador'})-[:TRABAJA_EN]->(p:Proyecto)<-[:TRABAJA_EN]-(i2:Investigador)
RETURN  i.id, i.titulo_academico, i.institucion, i.email, COLLECT(DISTINCT i2.nombre_completo) AS nombresColegas;


//*****Asociar*****
//Asociar investigador a proyecto por ID
MATCH (i:Investigador), (p:Proyecto)
WHERE i.id = 1 AND p.idPry = 2 // Cambia 1 y 2 a los ID reales del investigador y el proyecto
CREATE (i)-[:TRABAJA_EN]->(p);

//Asociar investigador a proyecto por nombres
MATCH (i:Investigador), (p:Proyecto)
WHERE i.nombre_completo = 'Nombre del Investigador' AND p.titulo_proyecto = 'Título del Proyecto'
CREATE (i)-[:TRABAJA_EN]->(p);
 

//Asociar un articulo a un proyecto por ID
MATCH (pb:Publicacion), (p:Proyecto)
WHERE pb.idPub = 1 AND p.idPry = 2
CREATE (pb)-[:REALIZADA_EN]->(p);

//Asociar un investigador por ID a un proyecto por titulo del proyecto
MATCH (i:Investigador), (p:Proyecto)
WHERE i.id = 1 AND p.titulo_proyecto = 'titulo proyecto'
CREATE (i)-[:TRABAJA_EN]->(p);

//Asociar por nombre de articulo y titulo de proyecto
MATCH (pb:Publicacion), (p:Proyecto)
WHERE pb.titulo_publicacion = 'titulo publicacion' AND p.titulo_proyecto = 'titulo proyecto'
CREATE (pb)-[:REALIZADA_EN]-> (p);

//*****Top 5*****
//Top 5 areas de conocimiento segun su cantidad de proyectos
MATCH (p:Proyecto)
WITH p.area_conocimiento AS area_conocimiento, COUNT(p) AS cantidadProyectos
RETURN area_conocimiento AS nombre, cantidadProyectos AS cantidad
ORDER BY cantidadProyectos DESC
LIMIT 5;

//Top 5 instituciones segun la cantidad de proyectos que hay
MATCH (i:Investigador)-[:TRABAJA_EN]->(p:Proyecto)
WITH i.institucion AS institucion, COUNT(p) AS cantidad
RETURN institucion AS nombre, cantidad
ORDER BY cantidad DESC
LIMIT 5;

//Top 5 investigadores segun la cantidad de proyectos en la que trabajan
MATCH (i:Investigador)-[:TRABAJA_EN]->(p:Proyecto)
WITH i, i.institucion AS institucion, COUNT(p) AS cantidad
RETURN i.nombre_completo AS nombre, institucion, cantidad
ORDER BY cantidad DESC
LIMIT 5;