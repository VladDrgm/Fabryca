import { Link, useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import { Frame, Button } from '@react95/core';


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
                <Button className="project__card__link" onClick={handleClick}>Go to Project</Button>
            </Frame>
        </Frame>
    );
}

export default ProjectCard;