// Libraries
import PopupWrapper from "../features/PopupWrapper";
import { buttonSize, buttonStyle } from "../../constants/constants";

interface FormProps {
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
function ConfirmationForm({ isOpen, toggle, onSave }: Readonly<FormProps>) {
  return (
    <PopupWrapper popup={isOpen} setPopup={toggle} status="neutral">
      <div className="flex flex-col space-y-6">
        <h1 className="text-center text-2xl font-bold text-black dark:text-slate-100">
          {"Confirmation"}
        </h1>
        <div className="text-slate-700 dark:text-slate-200">
          {"Etes-vous sûr de vouloir supprimer cet élément ?"}
        </div>
        <div className="flex flex-row justify-between">
          <button
            className={`${buttonStyle.error} ${buttonSize.medium}`}
            onClick={toggle}
          >
            Annuler
          </button>
          <button
            className={`${buttonStyle.success} ${buttonSize.medium}`}
            onClick={onSave}
          >
            Valider
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
}

export default ConfirmationForm;
