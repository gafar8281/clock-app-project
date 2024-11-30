import { useRef,useState } from 'react';
import PolarClock from './components/polarClock';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faGhost} from '@fortawesome/free-solid-svg-icons';
import Modal from './components/model';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const clockRef = useRef(null);

  const scrollToClock = () => {
    if (clockRef.current) {
      clockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <div>
     
      <div className="image-container">
        <img className="main-image" src="/malay_clocknew.png" alt="Description of the image" />
        <button className="scroll-button" onClick={scrollToClock}>
          <FontAwesomeIcon icon={faChevronDown} size="lg" />
        </button>
      </div>
      <div ref={clockRef} className="clock-container">
        <PolarClock />
      </div>
      <div className="icon-container">
        <button className="ghost-button" onClick={toggleModal}>  
          <FontAwesomeIcon icon={ faGhost } size="xl" />
        </button>
        <Modal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
    </div>
  );
}

export default App;



