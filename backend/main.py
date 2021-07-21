from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db = SessionLocal()

db_geneset = crud.create_geneset(db, schemas.GenesetCreate(title="some title"))
crud.create_geneset_item(db, schemas.GeneCreate(name="some gene"), db_geneset.id)

@app.get("/genesets/", response_model=List[schemas.Geneset])
def read_all_genesets(db: Session = Depends(get_db)):
    genesets = crud.get_genesets(db)
    return genesets

@app.get("/genesets/{geneset_id}", response_model=schemas.Geneset)
def read_geneset(geneset_id: int, db: Session = Depends(get_db)):

    return crud.get_geneset(db, geneset_id)

@app.put("/genesets/{geneset_id}")
def update_genesets(geneset_id: int, db: Session = Depends(get_db)):

    return crud.get_geneset(db, geneset_id)

@app.post("/genesets")
def create_geneset(geneset: schemas.GenesetCreate, db: Session = Depends(get_db)):
    db_geneset = crud.create_geneset_with_genes(db, geneset)
    return db_geneset.id