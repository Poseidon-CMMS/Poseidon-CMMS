# Poseidon CMMS
Un proyecto hecho por Mauricio Lima y Fernando Navarro, que es un producto del proyecto final de Ingeniería en Informática, Universidad Nacional de Mar del Plata.

![Logo](https://i.ibb.co/cNmHj0P/logo256.png)

## Resumen

El presente sistema proporcionará apoyo en la toma de decisiones relacionadas al mantenimiento de dispositivos de medición agropecuarios. Estos dispositivos se encargan de monitorear equipos en tiempo real para permitir al productor agrícola una mejor supervisión de sus equipos, ahorrando tiempo, dinero y agua. 
Se enmarca en el tipo de software llamado CMMS (Computerized Maintenance Management System, Sistema computarizado de gestión del mantenimiento). Un CMMS es un sistema que busca ayudar en la gestión de mantenimiento de los activos de una empresa. 

***

## Participantes
***
Participantes que contribuyeron al proyecto:
* [Mauricio Lima](https://github.com/NavarroFer) 
* [Fernando Navarro](https://github.com/mau-lima)


## Instrucciones

Este repositorio incluye el servidor KeystoneJS que se comporta como el backend del producto. Se incluye el Dockerfile necesario para generar una imagen Docker para ser montada en cualquier servicio. Además, se incluye un docker-compose apto para la realización de pruebas en un entorno de desarrollo local.

### Variables de entorno

- DATABASE_URL: La URL de la base de datos PostgreSQL a utilizar. Por ejemplo, `postgres://poseidonuser:poseidonpassword@localhost:5432/poseidon.
- SESSION_SECRET: Secreto utilizado para generar los tokens de sesión de KeystoneJS. Utilizar una secuencia aleatoria de al menos 32 caracteres.
- M2M_API_KEY: Secreto utilizado para la comunicación con sistema de detección de fallas en tiempo real. Utilizar una secuencia aleatoria de al menos 32 caracteres.
- CORS_FRONTEND_URL: URL del frontend para completar el header `Access-Control-Allow-Origin`. Por ejemplo, `http://localhost:8080`
- NODE_ENV: Tipo de entorno NodeJS. Por ejemplo, `development` o `production`.
- PORT: Puerto en el cual se disponibilizará la interfaz de administrador de KeystoneJS. Por ejemplo, `4000`.

### Pasos a seguir para ejecutar localmente

#### Requisitos
- NodeJS
- Docker

1. Clonar el repositorio
2. Crear un archivo `.env` en la raíz y setear las variables de entorno mencionadas anteriormente (o copiar el .env-example y renombrarlo).
3. Ejecutar el comando `npm install`.
4. Ejecutar el comando `npm run dev`.
5. Abrir la interfaz de administrador `localhost:3000` en su navegador. Si cambió la variable de entorno PORT entonces deberá cambiar el puerto por el que haya seleccionado.
6. Para acceder al frontend, ejecute los pasos de ejecución local del [repo correspondiente](https://github.com/Poseidon-CMMS/poseidon-cmms-app). Asegurarse de establecer la variable CORS_FRONTEND_URL correctamente después de este paso.

### Pasos a seguir para ejecutar en un servicio de hosting de containers

1. Crear un servicio Web utilizando este repo según las instrucciones del proveedor (El Dockerfile ya existe y esta incluido).
2. Crear una base de datos PostgreSQL en el servicio.
3. Establecer las variables de entorno con sus valores correspondientes. Asegurarse de establecer la variable `DATABASE_URL` con la URL obtenida en el paso anterior.
