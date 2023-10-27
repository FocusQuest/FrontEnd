import '../css/menu.css';
import { Outlet } from 'react-router-dom';
import MenuAdm from './MenuAdm';



function BaseAdm(): JSX.Element {
  return (
    <>
      <div className='App'>
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


