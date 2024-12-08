# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

3. Press 'w' to start web

## Unit test

To run the unit test, run:

```bash
npm run test
```

## Approach

Se utilizo el framework expo para agilizar el desarrollo, ademas se hizo uso de la plantilla que viene en el starter.

- API
Se creo el archivo api\apiClient.tsx como base para apis, en este se pueden ir agregando mas endpoints

se creo el archivo api\pokemonApi.tsx con axios para hacer el llamado a las api, La api principal regresaba solo el nombre y una url

La funcion fetchPokemonsList se configura para obtener los primeros 20 elementos
se creo una funcion calculateNextElements para calcular la pagina, sin embargo la misma api tiene las propiedades prev y next que pueden utilizarse para la paginacion

La funcion fetchPokemonData se configura para obtener la informacion con la url obtenida en la funcion anterior.

La funcion fetchPokemonsDataList hace uso de las 2 funciones anteriores, resuelve las promesas y regresa la informacion detallada de los pokemon

- UI Generalidades
Se utilizo 'react-native-paper' para reutilizar componentes.
Para el boton flotante se utilizo AnimatedFAB del punto anterior
Se utilizo 'StyleSheet.create' para dar estilo a algunos elementos
Se siguio el aproach de componentes tipo contenedor y presentacionales para separar logica, mediante el uso de inputs y outpus para enviar y recibir datos


- Componentes
El archivo components\ui\PokemonList.tsx utilizo una FlatList y elementos Pressable para mostrar el listado de pokemons, este archivo recibe un arreglo de detalles de pokemons para mostrarlos. Aqui mismo se utiliza un Modal para mostrar la informacion del pokemon seleccionado, esta data viene como un input, el modal muestra una PokeCard

Se creo components\ui\PokeCard.tsx para mostrar una tarjeta del pokemon con sus propiedades e imagen.

El archivo components\PokeApp.tsx es un componente tipo contenedor, es quien maneja la informacion y se la pasa en forma de inputs al hijo PokemonList.
Aqui se hace uso de las funciones 'dispatch' lanzar actualizaciones al estado, las cuales hacen peticiones a la api. 
La paginacion tambien esta incluida en este archivo, solo se realiza paginacion hacia delante. Se puede mejorar una paginacion hacia atras.
Cuenta con el componente 'SearchBox', el cual notifica la cadena de busqueda que se usa para filtrar los pokemons que coincidan con el criterio de busqueda.
En caso de que haya algun error en una llamada de api, aparece un modal que indica que hubo un error.
El boton flotante lanza una accion fetchPokemons que vuelve a ejecutar el llamado a la api inicialmente. Se puede agregar mas logica para que el boton de recargar desaparezca al estar buscando.

- State Management
Se implemento react redux, se creo una carpeta store\index.tsx donde se configuro la estructura, store, actions, reducers.
En los reducers se manejan los estados que reaccionan si las api fallan (mostrando un modal), cuando la informacion esta cargando (spinner) y es exitosa


- Utils
En esta carpeta se crearon 2 archivos:
utils: se extrajo una funcion filtra los pokemon por nombre y regresa las coincidencias. Aqui mismo se pueden implementar otras funciones que pueden ser utilizadas en otros componentes.
interfaces: Con el objetivo de utilizar estas definiciones en el typado sin generar referencias circulares.

- Pruebas Unitarias
De acuerdo a la documentacion de expo, se requiere una carpeta llamada '__test__'. Cuando se corren las pruebas, se ejecutan los tests de los archivos .test.tsx dentro de la misma.
En el archivo components\__tests__\PokeCard-test.tsx se utilizo render para validar que la informacion se rendereara correctamente, ademas se utilizaron los getByText para buscar que la informacion se popule de acuerdo al mock proporcionado.
En el archivo utils\__tests__\utils-test.tsx se extrajo la funcion que es utilizada para filtrar los pokemons desde el buscador, facilitando de esa manera la prueba del mismo. Se pudiera crear otra prueba extensiva donde se invlucren varios componentes y validar que se rendereen correctamente.
En el archivo components\__tests__\PokemonList-test.tsx se valida que los pokemons se muestren correctamente, se proporciono un mock de 2 elementos y posteriormente se valido que coincidieran con el mock.
Tambien se crearon 2 test para validar que se abriera el modal y se cerrara, esto con los eventos 'fireEvent.press'
El archivo api\__tests__\pokemonApi-test.tsx maneja los casos donde se emula que la api responde y falla.

- AsyncStorage
Se creo el archivo api\asyncStorage.tsx para guardar informacion del pokemon seleccionado, este se puede visualizar en la tab de Current Pokemon, inicialmente si no se selecciona alguno, se muestra un icono y un mensaje sobre ello.
Cuando hay un pokemon guardado, se muestra en la tab mencionada.

## Mas informacion

- Se configuro Jest, ESLint y Prettier, ver package.json para mas detalle