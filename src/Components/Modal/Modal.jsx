import styles from "./Modal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalWrapper({ isOpen, setIsOpen, children }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      maxWidth: "538px",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      height: "fit-content",
      maxHeight: "90vh",
      background: "rgba(239, 239, 239, 0.85)",
      border: "0",
      borderRadius: "15px",
      padding: "2rem",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      //when click outside the box, the box closes for that onRequestClose is there or via escape key
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      {children}
    </Modal>
  );
}
