# Gestor de tareas

Aplicación web con frontend React (Vite), API Python (FastAPI) y base de datos MySQL.

## Requisitos

- MySQL Server (y MySQL Workbench, recomendado para ejecutar el esquema).
- Python 3.10 o superior.
- Node.js y npm.

## 1. Configurar MySQL

1. Inicia el servicio de MySQL.
2. Abre `backend/schema.sql` en MySQL Workbench y ejecútalo con un usuario administrador. Esto crea la base de datos `gestor_tareas` y la tabla `tareas`.
3. En Workbench, ejecuta lo siguiente para crear un usuario para la aplicación (cambia la contraseña por una propia):

   ```sql
   CREATE USER IF NOT EXISTS 'gestor_app'@'localhost'
     IDENTIFIED BY 'cambia_esta_clave';
   GRANT SELECT, INSERT ON gestor_tareas.* TO 'gestor_app'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. Edita `backend/.env` y configura la conexión:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=gestor_app
   DB_PASSWORD=cambia_esta_clave
   DB_NAME=gestor_tareas
   ```

   `DB_PASSWORD` debe coincidir con la contraseña usada al crear el usuario. No compartas ni subas este archivo: contiene credenciales locales.

## 2. Instalar y levantar la API Python

Abre una terminal en la carpeta del proyecto y ejecuta:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

La API quedará disponible en `http://127.0.0.1:8000`. La documentación interactiva está en `http://127.0.0.1:8000/docs`.

Si PowerShell bloquea la activación del entorno virtual, puedes permitirla solo en esa terminal con `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` y volver a ejecutar el comando de activación.

## 3. Instalar y levantar React

Deja la API ejecutándose y abre **otra terminal** en la raíz del proyecto:

```powershell
cd frontend
npm install
npm run dev
```

Abre en el navegador la dirección que indique Vite (normalmente `http://localhost:5173`).

Vite reenvía las peticiones `/api` a la API local en el puerto `8000`; por eso ambos servidores y MySQL deben estar funcionando al usar la aplicación.