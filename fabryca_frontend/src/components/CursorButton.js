import styled from 'styled-components';
import { Button, Cursor } from '@react95/core';


const CursorButton = ({type, text, onClick}) => {

  const CursorButtonElement = styled(Button)`
  ${({ type }) => Cursor[type]};
  `;
  if (onClick){
  return (
    <CursorButtonElement type={type} onClick={onClick} > {text} </CursorButtonElement> 
  )} else {
    return(
    <CursorButtonElement type={type} > {text} </CursorButtonElement>)
  }
}

export default CursorButton;