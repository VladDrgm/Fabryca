// import logo from './logo.svg';
import '../App.css';
import React from 'react'; 
import Navbar from './Navbar';
import {  ThemeProvider } from '@react95/core'
import CategoryForm from './CategoryForm';



function NewCategoryPage() {
  
 

  return (
    <ThemeProvider>
    <div className="App" id="outer-container">
      <div id="page-wrap">
      <Navbar></Navbar>
      <CategoryForm></CategoryForm>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default NewCategoryPage;