// Base.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuTec from './MenuTec';



function BaseTecnico(): JSX.Element {
  return (
    <>
      <div className='App'>       
        <div>
          <MenuTec />
        </div>
        <div className='ContainerM'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseTecnico;

