import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import GenesetCard from "./Components/GenesetCard";
import GenesetModal from "./Components/GenesetModal";
import ActionButton from "./Components/ActionButton";
import { GenesetList, newGeneset } from "./Types/global.types";

const App = () => {
  const [genesets, setGenesets] = useState<GenesetList>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // use UseCallback to memorize the function
  const fetchGenesets = useCallback(async () => {
    try {
      const response = await axios.get("/genesets");
      setGenesets(response.data);
    } catch (error) {
      console.error("Error fetching genesets:", error);
      setApiError("An error occurred, please try again.");
    }
  }, []);

  // use useEffect to get all the genesets
  useEffect(() => {
    fetchGenesets();
    setLoading(false);
  }, []);

  // post a new geneset in the API
  const handleCreateGeneset = async (newGeneset: newGeneset) => {
    try {
      await axios.post("/genesets", newGeneset);
      fetchGenesets();
    } catch (error) {
      console.error("Error creating geneset:", error);
      setApiError("An error occurred, please try again.");
    }
  };

  if (loading) {
    return (
      <div>
        <p className="text-center text-lg text-gray-500">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-center mb-10 text-light-green">
        Genesets List
      </h1>
      <ActionButton
        text="Create a new geneset"
        variant="showModal"
        onClick={() => setShowModal(true)}
      />
      <div>
        {genesets.length > 0 ? (
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
            {genesets.map((geneset, index) => (
              <GenesetCard
                geneset={geneset}
                key={index}
                fetchGenesets={fetchGenesets}
                genesets={genesets}
                setApiError={setApiError}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-blue-400">
            No geneset are found
          </p>
        )}
      </div>
      {apiError && (
        <div className="text-center text-red-500 font-semibold mb-4">
          <p>{apiError}</p>
        </div>
      )}
      <GenesetModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleModalAction={handleCreateGeneset}
        fetchGenesets={fetchGenesets}
        genesets={genesets}
      />
    </div>
  );
};

export default App;
