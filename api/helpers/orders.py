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
            o.laboruId,
            o.number,
            o.name,
            o.createdAt,
            o.updatedAt,
            o.archived,
            o.archivedAt,
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
            "laboruId": row["laboruId"],
            "number": row["number"],
            "name": row["name"],
            "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
            "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,
            "archived": bool(row["archived"]),
            "archivedAt": row["archivedAt"].isoformat() if row["archivedAt"] else None,
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
        "orders": orders
    }


def get(db: Db, orderId: int):   
    query = """
        SELECT
            id,
            laboruId, 
            number,                
            createdAt,
            updatedAt,
            archived,
            archivedAt
        FROM clients
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
        "laboruId": row["laboruId"],
        "number": row["number"],       
        "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
        "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,
        "archived": bool(row["archived"]),
        "archivedAt": row["archivedAt"].isoformat() if row["archivedAt"] else None,
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

    if "archived" in data:
        fields.append("archived = %s")
        values.append(data["archived"])

        if data["archived"]:
            fields.append("archivedAt = NOW()")
        else:
            fields.append("archivedAt = NULL")

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
