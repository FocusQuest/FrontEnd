import './css/estilos.css';

import React from 'react';
import './css/index.css';
import { Outlet } from 'react-router-dom';
import MenuAdm from './pages/MenuAdm';



function BaseAdm(): JSX.Element {
  return (
    <>
      <div className='App'>
        {/* Use o componente Menu aqui */}
        <div>
          <MenuAdm/>
        </div>
        <div className='ContainerM'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseAdm;


