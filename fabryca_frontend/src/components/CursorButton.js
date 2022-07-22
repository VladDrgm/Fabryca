import styled from 'styled-components';
import { Button, Cursor } from '@react95/core';


const CursorButton = ({type, text}) => {

  const CursorButtonElement = styled(Button)`
  ${({ type }) => Cursor[type]};
  `;
  return (
    <CursorButtonElement type={type} > {text} </CursorButtonElement> 
  )
}

export default CursorButton;