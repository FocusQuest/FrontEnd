// Base.tsx
import React from 'react';
import './css/index.css';
import { Outlet } from 'react-router-dom';
import MenuTec from './pages/MenuTec';



function Base(): JSX.Element {
  return (
    <>
      <div className='App'>
        {/* Use o componente Menu aqui */}
        <div>
          <MenuTec/>
        </div>
        <div className='ContainerM'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Base;

