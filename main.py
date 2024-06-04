import psycopg2
from psycopg2 import sql
import random
from datetime import datetime, timedelta

# Función para generar una fecha aleatoria dentro de un rango
def random_date(start_date, end_date):
    return start_date + timedelta(seconds=random.randint(0, int((end_date - start_date).total_seconds())))

# Conexión a la base de datos
conn = psycopg2.connect(
    dbname="peluqueria",
    user="postgres",
    password="99.yoloco",
    host="localhost"
)
cursor = conn.cursor()

# Generar 1 millón de filas
for _ in range(1000000):
    # Generar datos aleatorios para movimientos
    fecha_transaccion = random_date(datetime(2024, 1, 1), datetime.now())
    id_tipo_movimiento = random.randint(1, 2)  # Ajusta según tu rango de tipos de movimiento
    id_categoria_movimiento = random.randint(1, 2)  # Ajusta según tu rango de categorías de movimiento
    descripcion = "Descripción del movimiento"

    # Insertar datos en la tabla movimientos
    cursor.execute(
        sql.SQL("INSERT INTO movimientos (fecha_transaccion, id_tipo_movimiento, id_categoria_movimiento, descripcion) VALUES (%s, %s, %s, %s) RETURNING id_movimiento"),
        (fecha_transaccion, id_tipo_movimiento, id_categoria_movimiento, descripcion)
    )
    conn.commit()
    id_movimiento = cursor.fetchone()[0]
    print("Filas agregadas exitosamente.")

    # Generar datos aleatorios para transferencias bancarias
    comprobante = random.randint(1000, 9999)
    monto = random.randint(1000, 100000)  # Ajusta según el rango de montos que desees
    fecha_transferencia = fecha_transaccion
    descripcion_transferencia = "Descripción de la transferencia"
    id_cuenta_beneficiario = random.randint(1, 2)  # Ajusta según el rango de cuentas bancarias
    id_cuenta_emisor = random.randint(1, 2)  # Ajusta según el rango de cuentas bancarias

    # Insertar datos en la tabla transferencias bancarias
    cursor.execute(
        sql.SQL("INSERT INTO transferencias_bancarias (comprobante, monto, fecha_transferencia, descripcion, id_cuenta_beneficiario, id_cuenta_emisor, id_movimiento) VALUES (%s, %s, %s, %s, %s, %s, %s)"),
        (comprobante, monto, fecha_transferencia, descripcion_transferencia, id_cuenta_beneficiario, id_cuenta_emisor, id_movimiento)
    )
    conn.commit()
    print("Filas agregadas exitosamente.")

# Confirmar los cambios y cerrar la conexión

cursor.close()
conn.close()

print("Filas agregadas exitosamente.")