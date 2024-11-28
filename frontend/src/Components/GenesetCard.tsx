import { useState } from "react";
import { Geneset, GenesetList, newGeneset } from "../Types/global.types";
import axios from "axios";
import ActionButton from "./ActionButton";
import GenesetModal from "./GenesetModal";

type GenesetCardProps = {
  geneset: Geneset;
  fetchGenesets: () => void;
  genesets: GenesetList;
  setApiError: React.Dispatch<React.SetStateAction<string>>;
};

const GenesetCard = ({
  geneset,
  fetchGenesets,
  genesets,
  setApiError,
}: GenesetCardProps) => {
  const [genesetToEdit, setGenesetToEdit] = useState<Geneset>();
  const [showModal, setShowModal] = useState(false);

  // get one specific geneset by its ID
  const fetchGenesetById = async (genesetId: number) => {
    try {
      const response = await axios.get(`/genesets/${genesetId}`);
      setGenesetToEdit(response.data);
    } catch (error) {
      console.error("Error fetching geneset by id:", error);
      setApiError("An error occurred, please try again.");
    }
  };

  const handleModifyGeneset = async (newGeneset: newGeneset) => {
    if (genesetToEdit) {
      try {
        await axios.put(`/genesets/${genesetToEdit.id}`, newGeneset);
      } catch (error) {
        console.error("Error fetching geneset by id:", error);
        setApiError("An error occurred, please try again.");
      }
    }
  };

  return (
    <li
      key={geneset.id}
      className="bg-violet p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <h2 className="text-2xl font-medium text-center mb-6 text-light-blue ">
        {geneset.title}
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {geneset.genes.map((gene, index) => (
          <li
            key={index}
            className="text-lg text-center rounded-lg bg-white text-light-blue p-2 "
          >
            {gene.name}
          </li>
        ))}
      </ul>
      <div className="text-right">
        <ActionButton
          text="Edit"
          variant="update"
          onClick={() => {
            fetchGenesetById(geneset.id);
            setShowModal(true);
          }}
        />
      </div>
      {genesetToEdit && (
        <GenesetModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleModalAction={handleModifyGeneset}
          genesetToEdit={genesetToEdit}
          fetchGenesets={fetchGenesets}
          genesets={genesets}
        />
      )}
    </li>
  );
};

export default GenesetCard;
