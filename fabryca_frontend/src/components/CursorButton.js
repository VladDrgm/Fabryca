import styled from 'styled-components';
import { Button, Cursor } from '@react95/core';
import './CursorButton.css'

const CursorButtonElement = styled(Button)`
${({ type }) => Cursor[type]};
`;

const CursorButton = ({type, text, onClick}) => {

  if (onClick){
  return (
    <CursorButtonElement className={'cursor--button'} type={type} onClick={onClick} > {text} </CursorButtonElement> 
  )} else {
    return(
    <CursorButtonElement className={'cursor--button'} type={type} > {text} </CursorButtonElement>)
  }
}

export default CursorButton;