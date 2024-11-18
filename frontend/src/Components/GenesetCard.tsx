import { Geneset } from "../Types/global.types";

type GenesetCardProps = {
  geneset: Geneset;
};

const GenesetCard = ({ geneset }: GenesetCardProps) => {
  return (
    <li
      key={geneset.id}
      className="bg-violet-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <h2 className="text-3xl text-center font-semibold text-white mb-6">
        {geneset.title}
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {geneset.genes.map((gene, index) => (
          <li
            key={index}
            className="text-lg text-center rounded-lg bg-white text-teal-500 p-2 "
          >
            {gene.name}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default GenesetCard;
