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

file = './dbf/DBF_VOLLVILLESPRL/DOCLIG.DBF'
table = DBF(file, encoding='latin-1')

conn = mysql.connector.connect(**dbConfig)
selectCursor = conn.cursor(buffered=True)
insertCursor = conn.cursor()

insertProductSql = """
INSERT INTO products (
    name,   
    createdAt,
    updatedAt
) VALUES (
    %(name)s,
    NOW(),
    NOW()
)
"""

sql = """
INSERT INTO orderItems (
    orderId,
    productId,
    name,
    amount,
    price,
    vat,   
    createdAt,
    updatedAt
) VALUES (
    %(orderId)s,   
    %(productId)s, 
    %(name)s,     
    %(amount)s,
    %(price)s,
    %(vat)s,
    NOW(),
    NOW()
)
"""

for record in table:  

    selectCursor.execute("SELECT id FROM orders WHERE laboruId = %s", (record["NUMINT"],))
    result = selectCursor.fetchone()
    orderId = result[0] if result else None

    productId = None

    if record["ARTCLE"]:
        selectCursor.execute("SELECT id FROM products WHERE laboruId = %s", (record["ARTCLE"],))
        result = selectCursor.fetchone()
        productId = result[0] if result else None
    
    """
    if not productId:
        selectCursor.execute("SELECT id FROM products WHERE name = %s", (record["ARTLIB"],))
        result = selectCursor.fetchone()
        productId = result[0] if result else None

    if not productId:
        data = {    
            "name": record["ARTLIB"],     
        }

        insertCursor.execute(insertProductSql, data)
        productId = insertCursor.lastrowid
    """

    if orderId:     
        ammount = 0
        if record["QTT"]:
            ammount = record["QTT"]

        name = ""
        if record["ARTLIB"]:
            name = record["ARTLIB"]
        
        price = 0
        if record["DS2PXU"]:
            price = record["DS2PXU"]

        vat = 0
        if record["TVX"]:
            vat = record["TVX"] * 100
        
        data = {                
            "orderId": orderId,
            "productId": productId, 
            "name": name,    
            "amount": ammount,
            "price": price,
            "vat": vat
        }

        vatRate = 0
        if record["TVX"]:           
            vatRate = record["TVX"] * 100

            updateOrderVatSql = """
                UPDATE orders o
                SET o.vatRate = (
                    SELECT MAX(oi.vat)
                    FROM orderItems oi
                    WHERE oi.orderId = o.id
                )
                WHERE o.id = %s
                """

        insertCursor.execute(sql, data)
        insertCursor.execute(updateOrderVatSql, (orderId,))


        

        
conn.commit()
insertCursor.close()
selectCursor.close()
conn.close()