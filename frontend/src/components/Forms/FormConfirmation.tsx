// Libraries
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface FormConfirmationProps {
  isOpen: boolean;
  toggle: () => void;
  onSave: () => void;
}

/**
 * Le rôle de ce composant est d'afficher une boîte de dialogue de confirmation
 * avec un message de confirmation et deux boutons, "Annuler" et "Valider".
 * Il est utilisé pour demander une confirmation à l'utilisateur avant d'effectuer une action.
 * Dans PEPH, il est utilisé uniquement pour les suppressions.
 */
function FormConfirmation({
  isOpen,
  toggle,
  onSave,
}: Readonly<FormConfirmationProps>) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Confirmation</ModalHeader>
      <ModalBody>Etes-vous sûr de vouloir supprimer cet élément ?</ModalBody>
      <ModalFooter>
        <button
          className="bg-red-600 hover:bg-red-800 text-white py-2 px-6 rounded"
          onClick={toggle}
        >
          Annuler
        </button>
        <button
          className="ml-auto bg-green-600 hover:bg-green-800 text-white py-2 px-6 rounded"
          onClick={onSave}
        >
          Valider
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default FormConfirmation;
