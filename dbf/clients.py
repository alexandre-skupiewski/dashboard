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

file = './dbf/DBF_VOLLVILLESPRL/TIE.DBF'
table = DBF(file, encoding='latin-1')

conn = mysql.connector.connect(**dbConfig)
cursor = conn.cursor()

sql = """
INSERT INTO clients (
    laboruId,
    name,
    description,
    email,
    vat,
    vatType,
    vatRate,
    phone1,
    phone2,
    phone3,
    phone4,
    lang,
    websiteUrl,
    createdAt,
    updatedAt
) VALUES (
    %(laboruId)s,
    %(name)s,
    %(description)s,
    %(email)s,
    %(vat)s,
    %(vatType)s,
    %(vatRate)s,
    %(phone1)s,
    %(phone2)s,
    %(phone3)s,
    %(phone4)s,
    %(lang)s,
    %(websiteUrl)s,
    NOW(),
    NOW()
)
"""

for record in table:
    vat = f"{record.get('TIEREFTVA','')}{record.get('TIENUMTVA','')}".strip()
    vatRate = "0%"
    if record.get("TVCCLE__S") and record.get("TVCCLE__S") != "":
        vatRate = record.get("TVCCLE__S")   

    data = {                
        "laboruId": record["TIECLE"],
        "name": record.get("TIENOM__1"),
        "description": record.get("TIENOM__2"),
        "email": record.get("WEBMEL"),
        "vat": vat or None,
        "vatType": record.get("TIEREGTVA"),
        "vatRate": vatRate,
        "phone1": record.get("TIENUMTE1"),
        "phone2": record.get("TIENUMTE2"),
        "phone3": record.get("TIENUMTE3"),
        "phone4": record.get("TIENUMTE4"),
        "lang": record.get("TIELNG").replace('FRA', 'fr'),
        "websiteUrl": record.get("WEBMEL"),
    }

    cursor.execute(sql, data)

conn.commit()
cursor.close()
conn.close()