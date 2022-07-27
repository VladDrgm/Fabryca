import {  useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { Frame } from '@react95/core';
import CursorButton from './CursorButton';


const ProjectCard = ({project}) => {
    const navigate = useNavigate();
    const handleClick = async (e) => {
      e.preventDefault();
      localStorage.setItem('projectName', project.name);
      navigate('/project');
    }
    
    return (
        <Frame padding={4} className="project__card--outer">
            <Frame boxShadow="in" className="project__card--inner">
                <h3 className="project__card__title">{project.name}</h3>
                <CursorButton text={'Go to Project'} className="project__card__link" onClick={handleClick} />
            </Frame>
        </Frame>
    );
}

export default ProjectCard;