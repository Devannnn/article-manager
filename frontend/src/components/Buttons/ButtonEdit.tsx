// Libraries
import React, { useState } from "react";
import { Info } from "react-feather";
import axios from "axios";
import { Article } from "../Tools/Types";
import FormArticle from "../Forms/FormArticle";
import { useDispatch } from "react-redux";
import { EDIT_ARTICLE, SET_NOTIFICATION } from "../../redux/actionsCreators";

interface ButtonEditProps {
  url: string;
  activeItem: Article;
}

/***
 * The goal of this component is to provide a button to add an entity. The component takes
 * in a method named fetchData and a string named urlToFetch as props. The component triggers
 * a modal form and send the data in a POST request to the urlToFetch. Then it calls the callback
 * fetchData to update the datatable.
 */
function ButtonEdit({ url, activeItem }: Readonly<ButtonEditProps>) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);

  function toggleModal() {
    setModal(!modal);
  }

  function edit(article: Article) {
    toggleModal();
    axios
      .patch(`${url}${article.id}/`, article)
      .then(() => {
        dispatch(EDIT_ARTICLE(article.id, article));
        dispatch(SET_NOTIFICATION("An article has been updated", "success"));
      })
      .catch((error) => {
        console.error(error);
        dispatch(SET_NOTIFICATION(error.response.data, "error"));
      });
  }

  return (
    <div className="d-flex justify-content-end">
      <Info
        onClick={toggleModal}
        size={"40px"}
        strokeWidth={"2px"}
        color={"#198754"}
      />

      {modal && (
        <FormArticle
          isOpen={modal}
          toggle={toggleModal}
          onSave={edit}
          title={"Fiche de l'article"}
          activeItem={activeItem}
          showDeleteButton={true}
        />
      )}
    </div>
  );
}

// Exportation
export default ButtonEdit;
