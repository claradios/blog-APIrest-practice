# front-blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

La programacion por componentes es con un enfoque declarativo. 
Haces una plantilla con huecos que serán variables javascript, que si cambian se sustituirán en el pintado .

La diferencia es que en angular esas variables son atributos de una clase y en react y vue están asociados a atributos de la propiedad "data" del objeto que exportas.

Se utiliza el export de ES6 (el export default).

PUBLIC -> lo que pongas ahi va a la raiz de la pagina directamente.
SRC/ASSETS -> se procesa por webpack antes de ir a la raiz de la página.

## cómo ejecuto código:

Los códigos se definenen en la propiedad "methods" y ahí vas poniendo las funciones asociadas a lo que necesites. 

dato -> d3 es ua libreia de graficos de muy bajo nivel. esta librería manipula directamente el DOM.

el router de react

// https://github.com/vuejs/vue-router/tree/dev/examples

## el rooter hay que configurarlo al instalarlo. no viene por defecto