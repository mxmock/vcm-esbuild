import React from "react";
import Icon from "../Icon";
import Modal from "../Modal";

const StatusPopup = ({ form, onClose }) => {
  return (
    <>
      {(!!form.error || !!form.loading || !!form.success) && (
        <Modal onClose={onClose}>
          {form.success ? (
            <div className={`popup-info popup-info--success`}>
              <div className="popup-info__title">
                <Icon name="checkmark-circle-outline" />
                <h4>Demande envoyée avec succès</h4>
              </div>
              <div className="popup-info__body">
                <p>
                  Votre demande a bien été envoyée, vous serez recontacté très prochainement par
                  email ou téléphone
                </p>
              </div>
              <div className="popup-info__footer">
                <button
                  className="button"
                  onClick={onClose}
                >
                  <span>Ok</span>
                </button>
              </div>
            </div>
          ) : form.error ? (
            <div className={`popup-info popup-info--error`}>
              <div className="popup-info__title">
                <Icon name="alert-circle-outline" />
                <h4>Une erreur s'est produite lors de l'envoi du formulaire</h4>
              </div>
              <div className="popup-info__body">
                <p>
                  Quelque chose s'est mal passé lors de l'envoi du formulaire, vous pouvez réessayer
                  ou bien nous contacter directement au +590690903834
                </p>
              </div>
              <div className="popup-info__footer">
                <button
                  className="button"
                  onClick={onClose}
                >
                  <span>Ok</span>
                </button>
              </div>
            </div>
          ) : (
            <div className={`popup-info popup-info--default`}>
              <div className="popup-info__title">
                <Icon name="time-outline" />
                <h4>Envoi du formulaire...</h4>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default StatusPopup;
