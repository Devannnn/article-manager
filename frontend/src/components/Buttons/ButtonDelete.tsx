// Libraries
import React, { useState } from "react";
import axios from "axios";
import FormConfirmation from "../Forms/FormConfirmation";
import { useDispatch } from "react-redux";
import { SET_NOTIFICATION } from "../../redux/actionsCreators";

interface ButtonDeleteProps {
  fetchData: () => void;
  urlToRequest: string;
  itemId: number;
}

/**
 * The role of this component is to handle the deletion of an item.
 * It displays a "Delete" button that, when clicked, opens a confirmation form.
 * When the confirmation window is confirmed, a DELETE request is sent to the API.
 */
function ButtonDelete({
  fetchData,
  urlToRequest,
  itemId,
}: Readonly<ButtonDeleteProps>) {
  const dispatch = useDispatch();
  const [modalRemove, setModalRemove] = useState(false);

  function toggleModalRemove() {
    setModalRemove(!modalRemove);
  }

  function remove(itemId: number) {
    setModalRemove(!modalRemove);
    axios
      .delete(`${urlToRequest}${itemId}/`)
      .then(() => {
        fetchData();
        dispatch(SET_NOTIFICATION("An article has been deleted", "success"));
      })
      .catch((error) => {
        console.error(error);
        dispatch(SET_NOTIFICATION(error.response.data, "error"));
      });
  }

  return (
    <>
      <button
        className="bg-red-600 hover:bg-red-800 text-white py-2 px-6 rounded"
        onClick={toggleModalRemove}
      >
        Supprimer
      </button>

      <FormConfirmation
        isOpen={modalRemove}
        toggle={toggleModalRemove}
        onSave={() => remove(itemId)}
      />
    </>
  );
}

// Exportation
export default ButtonDelete;
