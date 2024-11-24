import React from 'react';
import './model.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCode , faXmark} from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3> Nazhika (നാഴിക)</h3>
        <p>Nazhika is a traditional unit of time and distance used in Kerala. A day is divided <br />
        into 60 hours... <a href="https://ml.wikipedia.org/wiki/%E0%B4%A8%E0%B4%BE%E0%B4%B4%E0%B4%BF%E0%B4%95" target='_blank'>more</a> </p>
        <p><FontAwesomeIcon icon={faCode} style={{color:'#FF8C00'}}/>  Created by <i> Abdul Gafar</i></p>
        <p>
        <FontAwesomeIcon icon={faLink} style={{color:'#FF8C00'}}/>  <a href="https://www.linkedin.com/in/abdul-gafar" target="_blank" rel="noopener noreferrer"> <i> abdul-gafar/linkdin </i></a>
        </p>
        <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark}/></button>
      </div>
    </div>
  );
};

export default Modal;


