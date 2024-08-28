import React from "react";
import { CloseButton, ModalMain, ModalWrapper } from "./ModalStyledComponents";
import { ModalProps } from "../../types";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalMain>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalMain>
    </ModalWrapper>
  );
};

export default Modal;
