from helpers.db import Db
import math
import time

import math
from typing import Optional

def search(
    db: Db,
    orderId: int,
    page: int = 1,
    pageSize: int = 100,
    searchQuery: str = ""
):
    offset = (page - 1) * pageSize

    where_clauses = []
    params = []
    
    if orderId is not None:
        where_clauses.append("o.id = %s")
        params.append(orderId)

    if searchQuery:
        where_clauses.append("(oi.name LIKE %s)")
        params.append(f"%{searchQuery}%")
       
    where_sql = " AND ".join(where_clauses)

    # -------- COUNT --------
    query = f"""
        SELECT COUNT(*) AS total
        FROM orderItems oi
        LEFT JOIN orders o ON o.id = oi.orderId        
    """

    if where_sql:
        query += f"\nWHERE {where_sql}"

    res = db.execute(query, tuple(params))
    row = next(iter(res), None)
    total = row["total"] if row else 0
    pageCount = math.ceil(total / pageSize) if pageSize > 0 else 0

    # -------- DATA --------
    query = f"""
        SELECT
            oi.id, 
            oi.name,
            oi.price,
            oi.amount,
            oi.vat,           
            oi.createdAt,
            oi.updatedAt,            
            o.id   AS orderId,
            o.name AS orderName
        FROM orderItems oi    
        LEFT JOIN orders o ON o.id = oi.orderId      
    """

    if where_sql:
        query += f"WHERE {where_sql}"

    query += """            
        ORDER BY oi.id ASC
        LIMIT %s OFFSET %s
    """

    params = params + [pageSize, offset]
    rows = db.execute(query, tuple(params))

    orders = []
    for row in rows:
        orders.append({
            "id": row["id"], 
            "name": row["name"],
            "price": row["price"],
            "amount": row["amount"],
            "vat": row["vat"],           
            "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
            "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,           
            "order": {
                "id": row["orderId"],
                "name": row["orderName"]
            } if row["orderId"] else None
        })

    return {
        "page": page,
        "pageSize": pageSize,
        "total": total,
        "pageCount": pageCount,
        "items": orders
    }


def get(db: Db, orderId: int):   
    query = """
        SELECT
            id,  
            name,  
            price,
            amount,
            vat,                
            createdAt,
            updatedAt
        FROM orderItems
        WHERE id = %s
        LIMIT 1
    """
    rows = db.execute(query, (orderId,))
    row = next(iter(rows), None)

    if row is None:
        return None
    
    #time.sleep(5)

    return {
        "id": row["id"],        
        "name": row["name"], 
        "price": row["price"], 
        "amount": row["amount"], 
        "vat": row["vat"],       
        "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
        "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None        
    }

def create(db: Db, data: dict):
    columns = []
    placeholders = []
    values = []

    if "archived" in data:
        columns.append("archived")
        placeholders.append("%s")
        values.append(data["archived"])

        columns.append("archivedAt")
        placeholders.append("NOW()" if data["archived"] else "NULL")
    
    columns.extend(["createdAt", "updatedAt"])
    placeholders.extend(["NOW()", "NOW()"])

    query = f"""
        INSERT INTO orders ({', '.join(columns)})
        VALUES ({', '.join(placeholders)})
    """
   
    cursor = db.execute(query, tuple(values))
    orderId = cursor.lastrowid
    db.conn.commit()
    #time.sleep(5)

    return get(db, orderId)

def update(db: Db, orderId: int, data: dict):   
    fields = []
    values = []

    """ if "archived" in data:
        fields.append("archived = %s")
        values.append(data["archived"])

        if data["archived"]:
            fields.append("archivedAt = NOW()")
        else:
            fields.append("archivedAt = NULL")"""

    fields.append("updatedAt = NOW()")

    if not fields:
        return get(db, orderId)

    query = f"""
        UPDATE orders
        SET {', '.join(fields)}
        WHERE id = %s
    """
    values.append(orderId)
    db.execute(query, tuple(values))
    db.conn.commit()

    #time.sleep(5)

    return get(db, orderId)
