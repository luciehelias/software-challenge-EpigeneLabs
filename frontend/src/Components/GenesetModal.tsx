import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { newGeneset } from "../Types/global.types";

type GenesetModalProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleCreateGeneset: (newGeneset: newGeneset) => Promise<void>;
};

const GenesetModal = ({
  showModal,
  setShowModal,
  handleCreateGeneset,
}: GenesetModalProps) => {
  const [error, setError] = useState<string>("");
  const initialState = {
    title: "",
    genes: [{ name: "" }], // start with an emty gene
  };

  const [newGeneset, setNewGeneset] = useState<newGeneset>(initialState);

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [newGeneset]);

  // Add a gene to the list
  const addGene = () => {
    setNewGeneset((prevState) => ({
      ...prevState,
      genes: [...prevState.genes, { name: "" }], // add new input to write a new gene
    }));
  };

  const handleGeneChange = (index: number, value: string) => {
    const updatedGenes = [...newGeneset.genes];
    updatedGenes[index] = { name: value };
    setNewGeneset((prevState) => ({
      ...prevState,
      genes: updatedGenes,
    }));
  };

  const handleClear = () => {
    setShowModal(false);
    setError("");
    setNewGeneset(initialState);
  };

  const handleSubmit = () => {
    // filter empty genes and delete them to have only validGenes with string
    const validGenes = newGeneset.genes.filter(
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

    const genesetToSubmit = {
      ...newGeneset,
      genes: validGenes,
    };

    handleCreateGeneset(genesetToSubmit);
    handleClear();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex justify-center items-center ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-auto">
            <h2 className="text-3xl text-center text-violet-700 mb-6 ">
              Create a new geneset
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Title of the geneset
              </label>
              <input
                type="text"
                id="title"
                value={newGeneset.title}
                onChange={(e) =>
                  setNewGeneset({ ...newGeneset, title: e.target.value })
                }
                placeholder="Title of the geneset"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Genes</label>
              {newGeneset.genes.map((gene, index) => (
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
              <button
                onClick={addGene}
                className=" text-m flex items-center gap-2 my-4"
              >
                <FaCirclePlus className="text-xl" />
                Add Another Gene
              </button>
            </div>
            {error && <p className="text-red-700 text-center">{error}</p>}
            <div className="flex justify-between mt-10">
              <button
                onClick={handleSubmit}
                className="bg-violet-700 text-white py-2 px-4 rounded-lg"
              >
                Create a new geneset
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-800 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenesetModal;
