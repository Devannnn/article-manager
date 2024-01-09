// Bibliothèques
import React, { useState } from "react";
import FormArticle from "./FormArticle";

// Composant
function Ajout() {
  const [modalCreate, setModalCreate] = useState(false);

  function openForm() {
    setModalCreate(!modalCreate);
  }

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-success btn-lg" onClick={openForm}>
        Ajouter
      </button>

      {modalCreate && <FormArticle isOpen={modalCreate} toggleModal={openForm} />}
    </div>
  );
}

// Exportation
export default Ajout;
