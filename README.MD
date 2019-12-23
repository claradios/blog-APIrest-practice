## Funcionalidad
Se desea implementar un servicio para la gestión de un blog con persistencia y API REST. Las entradas del blog podrán tener comentarios y para evitar la publicación de aquellos que puedan ser ofensivos, el servicio deberá incluir internamente un validador.

Las entidades de información que deberá gestionar el blog son:
- Post. Cada entrada contiene los siguientes campos: Nombre del autor, Nickname del autor, Titulo, Texto, Lista de comentarios.
- Comment. Cada comentario contiene los siguientes campos: Nickname del autor del comentario, Contenido, Fecha del comentario.
- OffensiveWord: Cada palabra tendrá asociada un campo “level” indicando la gravedad de la palabra de 1 a 5.

## endpoints
La aplicación ofrecerá los siguientes endpoints REST:
- *Entradas y comentarios*
    - Recuperación de todas las entradas (sin comentarios)
    - Recuperación de una entrada (con comentarios)
    - Creación de una nueva entrada (sin comentarios)
    - Borrado de una entrada existente (con todos sus comentarios)
    - Modificación de una entrada existente (se actualizará toda la información de la misma, excepto sus comentarios)
    - Adición de un nuevo comentario a una entrada
    - Modificación de un comentario existente
    - Borrado de un comentario existente en una entrada
- *Palabras ofensivas*
    - Creación, listado, borrado y modificación de una palabra ofensiva.

Si el comentario que se intenta incorporar contiene alguna de las palabras ofensivas registradas en la BBDD, el comentario no se podrá crear. La petición REST será rechazada con un código de error y se devolverá un JSON con información sobre la palabra ofensiva (o palabras) y su nivel. Las palabras ofensivas estarán almacenadas en la BBDD. Si al arrancar la aplicación se detecta que no hay palabras ofensivas en la BBDD, la aplicación deberá insertar un juego de palabras por defecto.

# Aspectos técnicos
La aplicación estará dividida en, al menos, 4 módulos Node: 
- *app.js*: Tendrá el servidor Express. 
- *controller.js*: Tendrá definidos los métodos de la API REST. Se usará un router que será configurado en Express.
- *repository.js*: Módulo que contendrá el código de acceso a la base de datos.
- *validator.js*: Validador que verifica que el comentario no contiene ninguna palabra ofensiva.

## API REST:
La API REST deberá cumplir con el nivel de madurez 2 y el formato de las URLs deberá identificar recursos, no acciones.
Se deberá entregar un fichero postman.json con al menos un ejemplo de cada una de los endpoints de la API REST.

## Persistencia:
La persistencia se implementará con MongoDB de forma obligatoria. Se podrán usar el driver oficial Mongo o el ODM Mongoose.
Opcionalmente se podrá entregar la práctica con la persistencia de palabras ofensivas en una base de datos MySQL (con o si ORM).


 http://expressjs.com/es/4x/api.html#router