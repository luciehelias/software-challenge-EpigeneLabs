export type Gene = {
  id: number;
  name: string;
};

export type Geneset = {
  id: number;
  title: string;
  genes: Gene[];
};

export type GenesetList = Geneset[];

type newGene = { name: string };
export type newGeneset = { title: string; genes: newGene[] };
