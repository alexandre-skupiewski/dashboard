from helpers.db import Db
import math
import time

def search(db: Db, page: int = 1, pageSize: int = 100, searchQuery: str = ""):  

    offset = (page - 1) * pageSize

    where_clauses = []
    params = []

    if searchQuery:
        where_clauses.append("(c.name LIKE %s OR c.email LIKE %s)")
        params.append(f"%{searchQuery}%")
        params.append(f"%{searchQuery}%")

    where_sql = " AND ".join(where_clauses)

    query = f"""
        SELECT COUNT(*) AS total
        FROM clients c        
    """

    if where_sql:
        query += f"\nWHERE {where_sql}"

    res = db.execute(query, tuple(params))
    row = next(iter(res), None)
    total = row["total"] if row else 0
    pageCount = math.ceil(total / pageSize) if pageSize > 0 else 0

    query = f"""
        SELECT
            id,
            laboruId,
            name,
            email,
            description,
            createdAt,
            updatedAt,
            archived,
            archivedAt
        FROM clients c 
    """

    if where_sql:
        query += f"WHERE {where_sql}"

    query += """
        ORDER BY c.id ASC
        LIMIT %s OFFSET %s
    """

    params = params + [pageSize, offset]
    rows = db.execute(query, tuple(params))

    clients = []
    for row in rows:
        clients.append({
            "id": row["id"],
            "laboruId": row["laboruId"],
            "name": row["name"],
            "email": row["email"],
            "description": row["description"],
            "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
            "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,
            "archived": bool(row["archived"]),
            "archivedAt": row["archivedAt"].isoformat() if row["archivedAt"] else None,
        })

    #time.sleep(5)

    return {
        "page": page,
        "pageSize": pageSize,
        "total": total,
        "pageCount": pageCount,
        "items": clients
    }

def get(db: Db, client_id: int):   
    query = """
        SELECT
            id,
            laboruId,
            name,
            email,
            description,
            vat,
            vatType,
            vatRate, 
            phone1,  
            phone2,  
            phone3,  
            phone4,           
            createdAt,
            updatedAt,
            archived,
            archivedAt
        FROM clients
        WHERE id = %s
        LIMIT 1
    """
    rows = db.execute(query, (client_id,))
    row = next(iter(rows), None)

    if row is None:
        return None
    
    #time.sleep(5)

    return {
        "id": row["id"],
        "laboruId": row["laboruId"],
        "name": row["name"],
        "email": row["email"],
        "description": row["description"],
        "vat": row["vat"],
        "vatType": row["vatType"],
        "vatRate": row["vatRate"],
        "phone1": row["phone1"],
        "phone2": row["phone2"],
        "phone3": row["phone3"],
        "phone4": row["phone4"],
        "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
        "updatedAt": row["updatedAt"].isoformat() if row["updatedAt"] else None,
        "archived": bool(row["archived"]),
        "archivedAt": row["archivedAt"].isoformat() if row["archivedAt"] else None,
    }

def create(db: Db, data: dict):
    columns = []
    placeholders = []
    values = []

    if "name" in data:
        columns.append("name")
        placeholders.append("%s")
        values.append(data["name"])

    if "email" in data:
        columns.append("email")
        placeholders.append("%s")
        values.append(data["email"])

    if "description" in data:
        columns.append("description")
        placeholders.append("%s")
        values.append(data["description"])

    if "vat" in data:
        columns.append("vat")
        placeholders.append("%s")
        values.append(data["vat"])

    if "vatType" in data:
        columns.append("vatType")
        placeholders.append("%s")
        values.append(data["vatType"])

    if "vatRate" in data:
        columns.append("vatRate")
        placeholders.append("%s")
        values.append(data["vatRate"])

    if "phone1" in data:
        columns.append("phone1")
        placeholders.append("%s")
        values.append(data["phone1"])

    if "phone2" in data:
        columns.append("phone2")
        placeholders.append("%s")
        values.append(data["phone2"])

    if "phone3" in data:
        columns.append("phone3")
        placeholders.append("%s")
        values.append(data["phone3"])

    if "phone4" in data:
        columns.append("phone4")
        placeholders.append("%s")
        values.append(data["phone4"])

    if "archived" in data:
        columns.append("archived")
        placeholders.append("%s")
        values.append(data["archived"])

        columns.append("archivedAt")
        placeholders.append("NOW()" if data["archived"] else "NULL")

    # timestamps
    columns.extend(["createdAt", "updatedAt"])
    placeholders.extend(["NOW()", "NOW()"])

    query = f"""
        INSERT INTO clients ({', '.join(columns)})
        VALUES ({', '.join(placeholders)})
    """
   
    cursor = db.execute(query, tuple(values))
    clientId = cursor.lastrowid
    db.conn.commit()
    #time.sleep(5)

    return get(db, clientId)

def update(db: Db, client_id: int, data: dict):   
    fields = []
    values = []

    if "name" in data:
        fields.append("name = %s")
        values.append(data["name"])

    if "email" in data:
        fields.append("email = %s")
        values.append(data["email"])

    if "description" in data:
        fields.append("description = %s")
        values.append(data["description"])

    if "vat" in data:
        fields.append("vat = %s")
        values.append(data["vat"])

    if "vatType" in data:
        fields.append("vatType = %s")
        values.append(data["vatType"])
    
    if "vatRate" in data:
        fields.append("vatRate = %s")
        values.append(data["vatRate"])
    

    if "phone1" in data:
        fields.append("phone1 = %s")
        values.append(data["phone1"])

    if "phone2" in data:
        fields.append("phone2 = %s")
        values.append(data["phone2"])

    if "phone3" in data:
        fields.append("phone3 = %s")
        values.append(data["phone3"])

    if "phone4" in data:
        fields.append("phone4 = %s")
        values.append(data["phone4"])

    if "archived" in data:
        fields.append("archived = %s")
        values.append(data["archived"])

        if data["archived"]:
            fields.append("archivedAt = NOW()")
        else:
            fields.append("archivedAt = NULL")

    fields.append("updatedAt = NOW()")

    if not fields:
        return get(db, client_id)

    query = f"""
        UPDATE clients
        SET {', '.join(fields)}
        WHERE id = %s
    """
    values.append(client_id)
    db.execute(query, tuple(values))
    db.conn.commit()

    #time.sleep(5)

    return get(db, client_id)
