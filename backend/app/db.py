import os
from pathlib import Path
from dotenv import load_dotenv
from pymysql import connect
from pymysql.cursors import DictCursor

load_dotenv(Path(__file__).resolve().parents[1] / ".env")


def conectar():
    return connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ["DB_NAME"],
        charset="utf8mb4",
        cursorclass=DictCursor,
    )