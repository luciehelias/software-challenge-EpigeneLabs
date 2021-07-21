from sqlalchemy.orm import Session


from models import Gene, Geneset
from schemas import GenesetCreate, GeneCreate




def get_geneset(db: Session, geneset_id: int):

    return db.query(Geneset).filter(Geneset.id == geneset_id).first()

def update_geneset(db: Session, geneset_id: int):

    return db.query(Geneset).filter(Geneset.id == geneset_id).first()



def get_geneset_by_title(db: Session, title: str):

    return db.query(Geneset).filter(Geneset.title == title).first()




def get_genesets(db: Session, skip: int = 0, limit: int = 100):

    return db.query(Geneset).offset(skip).limit(limit).all()


def create_geneset_with_genes(db: Session, geneset: GenesetCreate):
    db_geneset = Geneset(title=geneset.title)
    db.add(db_geneset)

    for gene in geneset.genes:
        db_geneset.genes.append(Gene(name=gene.name))

    db.commit()
    db.refresh(db_geneset)
    return db_geneset

def create_geneset(db: Session, geneset: GenesetCreate):
    db_geneset = Geneset(title=geneset.title)
    db.add(db_geneset)
    db.commit()
    db.refresh(db_geneset)
    return db_geneset



def get_genes(db: Session, skip: int = 0, limit: int = 100):

    return db.query(Gene).offset(skip).limit(limit).all()



def create_geneset_item(db: Session, item: GeneCreate, geneset_id: int):
    db_gene = Gene(**item.dict(), geneset_id=geneset_id)
    db.add(db_gene)
    db.commit()
    db.refresh(db_gene)
    return db_gene
