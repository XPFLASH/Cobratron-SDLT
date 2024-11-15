# Cobratron-SDLT
Proyecto que sirve para cobrar cosas usando PostgreSQL para almacenar los clientes y pagos, así como React (+Vite) para el desarrollo de la parte del Frontend

## Requisitos Previos

Es necesario tener instalado [**PostgreSQL**](https://www.postgresql.org/)

## Clonar el Repositorio

Para clonar este repositorio en tu ordenador, abre una terminal y ejecuta el siguiente comando en la carpeta en donde tu desees:

```bash
git clone https://github.com/XPFLASH/Cobratron-SDLT.git
```
Es necesario tener [**Git**](https://git-scm.com/)  instalado para poder realizar esto 

## ¿Como crear la base de datos?

Una vez que se que se instalo PostgreSQL y se clono el repositorio en el ordenador, debemos realizar lo siguiente

**1. Configurar PostgreSQL en PG Admin:**

Debemos Abrir PG Admin y crear un servidor, luego debemos ingresar un nombre para el servidor (por ejemplo, `CobratronServer`), posteriormente en el campo Host, se ingresa `localhost` si se esta trabajando en tu máquina local, luego configuramos el puerto (por defecto es `5432`). En el campo Username y Password, ingresamos un usuario y contraseña de PostgreSQL.

**2. Crear la Base de Datos:**

Una vez conectado al servidor en PG Admin, haz clic derecho en Databases y selecciona Create > Database, finalmente nombramos la base de datos (por ejemplo, `cobratron`) y se hace clic en Save.

**3. Ejecutar el script desde el server:**

Dentro del proyecto clonado, debemos navegar a la carpeta `server`, debemos asegurarnos que PostgreSQL esté en ejecución y hay que crear un archivo `.env` (dentro de la carpeta server, a raíz de las demas carpetas dentro) esté configurado correctamente con la siguiente informacion:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=cobratron
```
Una vez todo configurado, se ejecuta el siguiente comando desde la carpeta server para inicializar las tablas:

- Abrimos una terminal ejecutandose en la carpeta de server
 
```bash
cd server
```

Ahora nos dirigimos a la carpeta scripts con el siguiente comando:

```bash
cd scripts
```

Dentro de esa carpeta ejecutamos el siguiente comando:

```bash
node dbSetup.js
```

Esto creará las tablas necesarias en la base de datos.

Las tablas que se crearán son:

- Clientes: almacena la información de los clientes.
- Adeudos: almacena los adeudos asociados a cada cliente.
- Pagos: almacena los pagos programados y realizados de cada adeudo.

Dentro de Pg Admin podemos ver nuestra base de datos así como las tablas que se crearon, ademas de la informacion que se almacenara dentro del sistema

## Funcionalidades

- **Registro de Clientes**: permite registrar nuevos clientes con datos como nombre, correo y teléfono.
- **Registro de Adeudos**: permite crear adeudos asociados a los clientes, especificando frecuencia y cantidad de pagos, de modo que calcula automáticamente las fechas y el monto de cada pago.
- **Gestión de Pagos:** permite ver los pagos asociados a cada adeudo y marcar los pagos como "realizados", cuando se completan todos los pagos de un adeudo, su estado se actualiza automáticamente a "Saldado".

## ¿Como ejecutarlo?

Para poder usarlo, es necesario tener abierta 2 terminales con la ruta de la carpeta en donde tenemos este proyecto (Ya sea en Visual Studio o CMD):

- 1 terminal ejecutandose en la carpeta de server
 
```bash
cd server 
```
  
```bash
npm run dev 
```
- 1 terminal ejecutandose en la carpeta de client
```bash
cd client 
```
  
```bash
npm run dev 
```
Cuando se ejecuta el comando en la terminal de client nos dara el siguiente enlace http://localhost:5173/ en donde hacemos click y nos llevara al sistema, dentro de este estara la pagina de inicio y se podra ver un menu con otras 2 opciones:

- Registrar Cliente: aqui podemos registrar a los clientes con su 1er adeudo en donde ingresamos algunos datos de ellos así como tambien datos del adeudo como el concepto, la cantidad total, la fecha de inicio así como la frecuencia de los pagos (Semanal, Mensual, Trimestral, Semestral, Anual), al momento de ingresar esos datos se calcula la fecha final así como tambien el costo de cada pago que debera realizar.
  
- Ver registros: aqui podemos ver la lista de clientes en donde si seleccionamos uno podemos ver los adeudos que tiene, tambien esta la opcion de generarle un nuevo adeudo similar al que esta en el registro de clientes, si seleccionamos un adeudo podemos ver detalles de los pagos que tiene que hacer, igualmente podemos pagar cada uno de ellos debemos poner la denominacion con centavos tambien es decir 2 puntos (ejem 100.00) de lo contrario marcara como invalido, si se pague cambia el estado de esa pago a 'pagado', si pagamos todos los pagos del adeudo entonces el adeudo cambia su estado a 'Saldado'.

En caso de querer salir de la ejeccución se ocupa ingresar Ctrl + C en las terminales de client y server 

