import json
import os
from datetime import datetime
from helpers.db import Db
import math

def search(db: Db, page: int = 1, pageSize: int = 100):   
    query = """
        SELECT COUNT(*) AS total
        FROM clients
    """
    res = db.execute(query)
    row = next(iter(res), None)
    total = row["total"] if row else 0
    pageCount = math.ceil(total / pageSize) if pageSize > 0 else 0

    query = """
        SELECT
            id,
            name,
            email,
            createdAt
        FROM clients
        ORDER BY createdAt DESC
        LIMIT %s OFFSET %s
    """

    rows = db.execute(query, (pageSize, (page - 1) * pageSize))

    clients = []
    for row in rows:
        clients.append({
            "id": row["id"],
            "name": row["name"],
            "email": row["email"],
            "createdAt": row["createdAt"].isoformat() if row["createdAt"] else None,
        })

    return {
        "page": page,
        "pageSize": pageSize,
        "total": total,
        "pageCount": pageCount,
        "clients": clients
    }
