from helpers.db import Db
import math
import time

import math
from typing import Optional

def search(
    db: Db,
    type: str,
    page: int = 1,
    pageSize: int = 100,
    clientId: int | None = None,
    searchQuery: str = ""
):
    offset = (page - 1) * pageSize

    where_clauses = ["o.type = %s"]
    params = [type]

    if clientId is not None:
        where_clauses.append("c.id = %s")
        params.append(clientId)

    if searchQuery:
        where_clauses.append("(o.name LIKE %s OR o.number LIKE %s)")
        params.append(f"%{searchQuery}%")
        params.append(f"%{searchQuery}%")

    where_sql = " AND ".join(where_clauses)

    # -------- COUNT --------
    query = f"""
        SELECT COUNT(*) AS total
        FROM orders o
        LEFT JOIN clients c ON c.id = o.clientId        
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
            o.id,
            o.type,
            o.laboruId,
            o.number,
            o.name,
            o.total,
            o.vat,
            o.vatType,
            o.vatRate,
            o.vatTotal,
            o.createdAt,
            o.updatedAt,
            o.archived,
            o.archivedAt,
            o.dueAt,
            c.id   AS clientId,
            c.name AS clientName,
            c.description AS clientDescription
        FROM orders o     
        LEFT JOIN clients c ON c.id = o.clientId      
    """

    if where_sql:
        query += f"WHERE {where_sql}"

    query += """            
        ORDER BY o.id ASC
        LIMIT %s OFFSET %s
    """

    params = params + [pageSize, offset]
    rows = db.execute(query, tuple(params))

    orders = []
    for row in rows:
        orders.append({
            "id": row["id"],
            "type": row["type"],
            "laboruId": row["laboruId"],
            "number": row["number"],
            "name": row["name"],
            "total": row["total"],
            "vat": row["vat"],
            "vatType": row["vatType"],
            "vatRate": row["vatRate"],
            "vatTotal": row["vatTotal"],
            "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
            "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,
            "archived": bool(row["archived"]),
            "archivedAt": row["archivedAt"].isoformat() if row["archivedAt"] else None,
            "dueAt": row["dueAt"].isoformat() if row["dueAt"] else None,
            "client": {
                "id": row["clientId"],
                "name": row["clientName"],
                "description": row["clientDescription"],
            } if row["clientId"] else None
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
            type,
            laboruId, 
            number, 
            name,  
            total,
            vat,
            vatType,
            vatRate,
            vatTotal,             
            createdAt,
            updatedAt,
            archived,
            archivedAt,
            dueAt
        FROM orders
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
        "type": row["type"],
        "laboruId": row["laboruId"],
        "number": row["number"], 
        "name": row["name"], 
        "total": row["total"], 
        "vat": row["vat"], 
        "vatRate": row["vatRate"], 
        "vatType": row["vatType"], 
        "vatTotal": row["vatTotal"],       
        "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
        "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,
        "archived": bool(row["archived"]),
        "archivedAt": row["archivedAt"].isoformat() if row["archivedAt"] else None,
        "dueAt": row["dueAt"].isoformat() if row["dueAt"] else None,
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

    if "name" in data:
        fields.append("name = %s")
        values.append(data["name"])

    if "total" in data:
        fields.append("total = %s")
        values.append(data["total"])

    if "vat" in data:
        fields.append("vat = %s")
        values.append(data["vat"])

    if "vatType" in data:
        fields.append("vatType = %s")
        values.append(data["vatType"])

    if "vatRate" in data:
        fields.append("vatRate = %s")
        values.append(data["vatRate"])

    if "vatTotal" in data:
        fields.append("vatTotal = %s")
        values.append(data["vatTotal"])

    if "dueAt" in data:
        fields.append("dueAt = %s")
        values.append(data["dueAt"])

    """
    if "archived" in data:
        fields.append("archived = %s")
        values.append(data["archived"])

        if data["archived"]:
            fields.append("archivedAt = NOW()")
        else:
            fields.append("archivedAt = NULL")
    """

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
