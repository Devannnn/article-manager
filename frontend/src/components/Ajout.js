// Bibliothèques
import React, { useState } from "react";
import axios from "axios";
import FormArticle from "./FormArticle";
import { getArticlesURL } from "./Urls";

// Composant
function Ajout({ fetchData }) {
  const [modalCreate, setModalCreate] = useState(false);
  const API_URL_ARTICLES = getArticlesURL();

  function toggleModalCreate() {
    setModalCreate(!modalCreate);
  }

  function create(item) {
    toggleModalCreate();
    axios
      .post(API_URL_ARTICLES, item)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-success btn-lg" onClick={toggleModalCreate}>
        Ajouter
      </button>

      {modalCreate && <FormArticle
        isOpen={modalCreate}
        toggle={toggleModalCreate}
        onSave={create}
        title="Ajout d'un article"
      />}
    </div>
  );
}

// Exportation
export default Ajout;
