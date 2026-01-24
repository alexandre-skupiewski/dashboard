from dbfread import DBF
import pandas as pd
import mysql.connector

dbConfig = {
    "host": "localhost",
    "user": "root",
    "password": "supersecretpassword",
    "database": "dashboard",
    "charset": "utf8mb4"
}

file = './dbf/DBF_VOLLVILLESPRL/ART.DBF'
table = DBF(file, encoding='latin-1')

conn = mysql.connector.connect(**dbConfig)
cursor = conn.cursor()

sql = """
INSERT INTO products (
    laboruId,
    name,   
    createdAt,
    updatedAt
) VALUES (
    %(laboruId)s,
    %(name)s,
    NOW(),
    NOW()
)
"""

for record in table:    
    data = {                
        "laboruId": record["ARTCLE"],
        "name": record["ARTLIB"],     
    }

    cursor.execute(sql, data)

conn.commit()
cursor.close()
conn.close()