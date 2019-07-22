Sistema de Gestión de Evaluaciones SEDO
================================

-----------
Descripción
-----------

Este proyecto contiene el código básico para crear la aplicación SEDO.

--------------
Pre-requisitos
--------------

Este proyecto necesita lo siguiente:
  - Un computador con linux, windows o mac
  - Tener instalado Node.js y npm
  - Tener instalado git
  - Conexión a internet para descargar los paquetes del proyecto

Existen otros requisitos,  pero estos se descargarán con el paquete de instalación
--------------------------------------------
Instalar pre-requisitos
--------------------------------------------
Para instalar los pre-requisitos siga los siguientes pasos


1. Descargue e instale Node js y npm::

  Windows descargue node desde::
  
    https://nodejs.org/es/download/
    
  En Linux (debian, ubuntu y derivados) mediante la terminal (Crtl+Alt+t)::
  
    sudo apt install nodejs
    sudo apt install npm

2. Descargue e instale git::

  Windows descargue node desde::
  
    https://git-scm.com/downloads
    
  En Linux (debian, ubuntu y derivados) mediante la terminal (Crtl+Alt+t)::
  
    sudo apt install git

3. Alternativamente puede descargar hyper como consola o terminal (no es obligatorio)::

    https://hyper.is/
    
   Configure hyper, en shell escriba lo siguiente::
   
    shell: 'C:\\Program Files\\Git\\git-cmd.exe',
   
   En shellArgs escriba lo siguiente::
     
     shellArgs: ['-i'],

--------------------------------------------
Como construir el proyecto
--------------------------------------------

Para cargar y probar el proyecto abra una terminal o consola de comandos en un directorio de trabajo

1. Descarge express desde la terminal o consola con los siguientes comandos::

    npm install -g create-react-native-app
    npm install -g react-native-cli
   
   Recuerde utilizar en comando `sudo` si esta en un sistema operativo linux.
   
2. Descarge e instale expo::

    npm install -g expo-cli
   
   Recuerde utilizar en comando `sudo` si esta en un sistema operativo linux.   

3. Ahora ir al directorio donde queremos guardar nuestro proyecto::

4. Clone el proyecto desde github escribiendo en la terminal::

    git clone https://github.com/pablopenam/Proyecto_IS.git

5. Cambie de directorio a la carpeta del proyecto con::

    cd Proyecto_IS

6. Instale las dependencia del proyecto con::

    npm install

7. Pruebe el proyecto utilizando en comando::

    npm start

8. Si el proyecto dice que falta un paqueto no el nombre <nombre_paquete>, haga lo siguiente::

  Instale react-native con::
  
     react-native
  
  Descargue el paquete con::
    
     npm install <nombre_paquete> --save
     react-native link

9. Si todo sale bien hasta debería en la consola aparecer un código qr y las indicaciones para construir en el dispositivo o ejecutar en el emulador::
