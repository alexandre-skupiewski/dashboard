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

file = './dbf/DBF_VOLLVILLESPRL/DOC.DBF'
table = DBF(file, encoding='latin-1')

conn = mysql.connector.connect(**dbConfig)
selectCursor = conn.cursor(buffered=True)
insertCursor = conn.cursor()

sql = """
INSERT INTO orders (
    laboruId,
    clientId,
    type,
    number,
    name,
    dueAt,
    total,
    vat,
    vatTotal,
    createdAt,
    updatedAt
) VALUES (
    %(laboruId)s,
    %(clientId)s, 
    %(type)s,
    %(number)s,
    %(name)s,
    %(dueAt)s, 
    %(total)s, 
    %(vat)s, 
    %(vatTotal)s,  
    %(createdAt)s,
    NOW()
)
"""

for record in table:  

    selectCursor.execute("SELECT id FROM clients WHERE laboruId = %s", (record["TIECLE"],))
    result = selectCursor.fetchone()
    clientId = result[0] if result else None

    if clientId:
        type = "";
        if record["JOUCAT"] == "VEN":
            type = "order"
        elif record["JOUCAT"] == "OFF":
            type = "offer"
        elif record["JOUCAT"] == "LTR":
            type = "ltr"       

        data = {                
            "laboruId": record["NUMINT"],
            "clientId": clientId,
            "type": type,
            "number": record["NUM"],
            "name": record["LIB"],
            "dueAt": record["ECH"],
            "total": record["DS2TTN"] or 0,
            "vat": record["DS2TVA"] or 0,
            "vatTotal": record["DS2TTC"] or 0,
            "createdAt": record["DTE"],
        }

        insertCursor.execute(sql, data)
        
conn.commit()
insertCursor.close()
selectCursor.close()
conn.close()