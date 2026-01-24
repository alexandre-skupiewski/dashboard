import mysql.connector
import os

class Db():    
    def __init__(self):
        self.conn = mysql.connector.connect(**{
            "host": os.environ.get("DB_HOST", "localhost"),
            "user": "root",
            "password": "supersecretpassword",
            "database": "dashboard",
            "charset": "utf8mb4"
        })
        self.cursor = self.conn.cursor(dictionary=True)
      
    def execute(self, sql, params=None):
        self.cursor.execute(sql, params or {})
        return self.cursor

    def commit(self):
        self.conn.commit()

    def close(self):
        self.cursor.close()
        self.conn.close()
