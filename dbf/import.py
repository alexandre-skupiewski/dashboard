from dbfread import DBF
import pandas as pd

dbfFile = './dbf/DBF_VOLLVILLESPRL/DOCLIG.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/doclig.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/ART.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/art.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/CAI.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/cai.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/CAT.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/cat.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/CATTIE.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/cattie.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/ANA.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/ana.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/BUD.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/bud.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/CMP.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/cmp.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/CMPLIG.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/cmplig.csv', index=False, encoding='utf-8')

dbfFile = './dbf/DBF_VOLLVILLESPRL/RAY.DBF'
table = DBF(dbfFile, encoding='latin-1')
f = pd.DataFrame(iter(table))
f.to_csv('./dbf/csv/ray.csv', index=False, encoding='utf-8')