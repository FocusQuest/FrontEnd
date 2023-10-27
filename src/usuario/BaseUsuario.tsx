import { Outlet } from 'react-router-dom';
import MenuUsuario from './MenuUsuario';



function BaseUsuario(): JSX.Element {
  return (
    <>
      <div className='App'>
        {/* Use o componente Menu aqui */}
        <div>
          <MenuUsuario/>
        </div>
        <div className='ContainerM'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseUsuario;

