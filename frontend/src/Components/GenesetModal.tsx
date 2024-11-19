import { useEffect, useState } from "react";

import { Geneset, newGeneset } from "../Types/global.types";
import AddGeneButton from "./AddGeneButton";
import ActionButton from "./ActionButton";

type GenesetModalProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleModalAction: (newGeneset: newGeneset) => Promise<void>;
  fetchGenesets: () => void;
  genesetToEdit?: Geneset;
};

const GenesetModal = ({
  showModal,
  setShowModal,
  handleModalAction,
  genesetToEdit,
  fetchGenesets,
}: GenesetModalProps) => {
  const [error, setError] = useState<string>("");

  //start with all the information inside the geneset or with empty gene for creation
  const initialState: newGeneset = {
    title: genesetToEdit ? genesetToEdit.title : "",
    genes: genesetToEdit
      ? genesetToEdit.genes.map((gene) => ({ name: gene.name }))
      : [{ name: "" }],
  };

  const [currentGeneset, setCurrentGeneset] =
    useState<newGeneset>(initialState);

  useEffect(() => {
    setCurrentGeneset(initialState);
  }, [genesetToEdit]);

  // Add a gene to the list
  const addGene = () => {
    setCurrentGeneset((prevState) => ({
      ...prevState,
      genes: [...prevState.genes, { name: "" }], // add new input to write a new gene
    }));
  };

  const handleGeneChange = (index: number, value: string) => {
    const updatedGenes = [...currentGeneset.genes];
    updatedGenes[index] = { name: value };
    setCurrentGeneset((prevState) => ({
      ...prevState,
      genes: updatedGenes,
    }));
  };

  const handleClear = () => {
    setShowModal(false);
    setError("");
    setCurrentGeneset(initialState);
  };

  const handleSubmit = async () => {
    // filter empty genes and delete them to have only validGenes with string
    const validGenes = currentGeneset.genes.filter(
      (gene) => gene.name.trim() !== ""
    );

    if (validGenes.length === 0) {
      setError("Please enter at least one valid gene.");
      return;
    }

    // search if some genes are identical
    const geneNames = validGenes.map((gene) => gene.name);
    const duplicates = geneNames.filter(
      (name, index) => geneNames.indexOf(name) !== index
    );

    if (duplicates.length > 0) {
      setError("Genes must be unique in a geneset");
      return;
    }

    const genesetToSubmit = { ...currentGeneset, genes: validGenes };

    try {
      await handleModalAction(genesetToSubmit);
      handleClear(); // Close the modal and reset state
      fetchGenesets(); // Reload the page after a successful update
    } catch (error) {
      console.error("Error updating geneset:", error);
      setError("An error occurred while updating the geneset.");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-3xl text-center text-violet-700 mb-6 ">
              {genesetToEdit ? "Update Geneset" : "Create a new geneset"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Title of the geneset
              </label>
              <input
                type="text"
                id="title"
                value={currentGeneset.title}
                onChange={(e) =>
                  setCurrentGeneset({
                    ...currentGeneset,
                    title: e.target.value,
                  })
                }
                placeholder="Title of the geneset"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Genes</label>
              {currentGeneset.genes.map((gene, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={gene.name}
                    onChange={(e) => handleGeneChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Name of the gene"
                  />
                </div>
              ))}
              <AddGeneButton onClick={addGene} text="Add Another Gene" />
            </div>
            {error && <p className="text-red-700 text-center">{error}</p>}
            <div className="flex justify-between gap-2">
              <ActionButton
                text="Cancel"
                variant="cancel"
                onClick={handleClear}
              />
              <ActionButton
                text={genesetToEdit ? "Update geneset" : "Create geneset"}
                variant="submit"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenesetModal;
