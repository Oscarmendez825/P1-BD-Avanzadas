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
CREATE (proyecto)-[:PUBLICADO_EN]->(publicacion);
//CREATE (publicacion)-[:REALIZADA_EN]->(proyecto); **************************Correir, esta relacion es la que sirve, la de arriba esta mal***********************


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

//Actualiza los valores de una investigacion por su ID
MATCH (i:Investigador {id: 1})
SET i.nombre_completo = 'Nuevo Nombre',
    i.titulo_academico = 'Nuevo Título Académico',
    i.institucion = 'Nueva Institución',
    i.email = 'nuevo_email@example.com';


//*****Busqueda de datos generales*****
//Busqueda de TODOS los investigadores
MATCH (i:Investigador)
RETURN i;

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

//Busqueda de investigador por nombre que devuelve toda su info y los proyectos donde participa
MATCH (i:Investigador {nombre_completo: 'Nombre Investigador'})-[:TRABAJA_EN]->(p:Proyecto)
WITH i, COLLECT({idProy: p.idPry, tituloProyecto: p.titulo_proyecto, annoInicio: p.anno_inicio, duracionMeses: p.duracion_meses, areaConocimiento: p.area_conocimiento}) AS proyectos
RETURN i.id AS idInvestigador, i.titulo_academico AS tituloAcademico, i.institucion AS institucion, i.email AS correo, proyectos;

//Busqueda de proyectos a partir de su nombre, devuelve info del proyecto, de los investigadores y de las publicaciones asociadas
MATCH (p:Proyecto {titulo_proyecto: 'Titulo Proyecto'})
RETURN [{idProy: p.idPry, annoInicio: p.anno_inicio , duracionMeses: p.duracion_meses, areaConocimiento: p.area_conocimiento}] AS proyecto,
       [(i:Investigador)-[:TRABAJA_EN]->(p) | {nombreCompleto: i.nombre_completo,tituloAcademico: i.titulo_academico, institucion: i.institucion, email: i.email}] AS investigadores,
       [(pb:Publicacion)<-[:PUBLICADO_EN]-(p) | {tituloPublicacion: pb.titulo_publicacion, annoPublicacion: pb.anno_publicacion, nombreRevista: pb.nombre_revista}] AS publicaciones;

//Busqueda de publicaciones a partir de su titulo, devuelve informacion de estas y el nombre de los proyectos asociados
MATCH (pb:Publicacion {titulo_publicacion: 'Titulo Publicacion'})<-[:PUBLICADO_EN]-(p:Proyecto)
RETURN pb.idPub AS idPublicacion, pb.anno_publicacion AS annoPublicacion, pb.nombre_revista AS nombreRevista, p.titulo_proyecto AS tituloProyecto;

//Busqueda de area de conocimiento por nombre del area, devuelve el nombre del area de conocimiento, los nombres de los proyectos asociados y de las publicaciones del area
MATCH (p:Proyecto {area_conocimiento: 'Nombre area conocimiento'})-[:PUBLICADO_EN]->(pb:Publicacion)
RETURN DISTINCT p.area_conocimiento AS areaConocimiento,
       COLLECT(DISTINCT p.titulo_proyecto) AS proyectos,
       COLLECT(DISTINCT pb.titulo_publicacion) AS publicaciones;

//Busqueda de colegas de un investigador a partir de su nombre, devuelve la informacion del investigador y el nombre de los investigadores con los que ha trabajado en otros proyectos.
MATCH (i:Investigador {nombre_completo: 'Nombre investigador'})-[:TRABAJA_EN]->(p:Proyecto)<-[:TRABAJA_EN]-(i2:Investigador)
RETURN  i.id AS idInvestigador, i.titulo_academico AS tituloAcademico, i.institucion AS institucion, i.email AS correo, COLLECT(DISTINCT i2.nombre_completo) AS nombresColegas;


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
CREATE (pb)-[:PUBLICADO_EN]->(p);

//*****Top 5*****
//Top 5 areas de conocimiento segun su cantidad de proyectos
MATCH (p:Proyecto)
WITH p.area_conocimiento AS areaConocimiento, COUNT(p) AS cantidadProyectos
RETURN areaConocimiento, cantidadProyectos
ORDER BY cantidadProyectos DESC
LIMIT 5;

//Top 5 instituciones segun la cantidad de proyectos
MATCH (i:Institucion)<-[:TRABAJA_EN]-(p:Proyecto)
WITH i, COUNT(p) AS cantidadProyectos
RETURN i.nombre AS NombreInstitucion, cantidadProyectos
ORDER BY cantidadProyectos DESC
LIMIT 5;

//Top 5 instituciones segun la cantidad de proyectos que hay
MATCH (i:Investigador)-[:TRABAJA_EN]->(p:Proyecto)
WITH i.institucion AS NombreInstitucion, COUNT(p) AS cantidadProyectos
RETURN NombreInstitucion, cantidadProyectos
ORDER BY cantidadProyectos DESC
LIMIT 5;

//Top 5 investigadores segun la cantidad de proyectos en la que trabajan
MATCH (i:Investigador)-[:TRABAJA_EN]->(p:Proyecto)
WITH i, i.institucion AS institucion, COUNT(p) AS cantidadProyectos
RETURN i.nombre_completo AS nombreCompleto, institucion, cantidadProyectos
ORDER BY cantidadProyectos DESC
LIMIT 5;



