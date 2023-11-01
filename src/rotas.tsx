import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UsuariosList from './adm/pages/usuariosList';
import { AuthProvider } from './login/contexts/auth';
import Signin from './login/pages/signin/login_usuario';
import Signup from './login/pages/signup/signup';
import Duvidas from './usuario/pages/Duvidas_frequentes';
import Painel from './usuario/pages/Meu_painel';
import BaseAdm from './adm/BaseAdm';
import Admin from './adm/pages/admin';
import ChamadosList from './adm/pages/chamadosList';
import Ferramentas from './adm/pages/ferramentas';
import BaseUsuario from './usuario/BaseUsuario';
import Formulario from './usuario/pages/Formulario';
import ChamadosUsuarios from './usuario/pages/Meus_chamados';
import ChamadoEnviado from './usuario/pages/chamado_enviado';
import BaseTecnico from './tecnico/BaseTecnico';
import PainelTec from './tecnico/pages/paineltec';
import FerramentasTec from './tecnico/pages/ferramentas_tec';
import ChamadosTec from './tecnico/pages/chamados_tec';
import LoginAdm from './login/pages/signin/login_adm';
import LoginTecnico from './login/pages/signin/login_técnico';
import ChamadosAtivos from './tecnico/pages/ativos';
import CriaUsuario from './adm/pages/criar_usuario';
import AdicionaFerramenta from './adm/pages/adicionar_ferramenta';
import RedefineSenha from './adm/pages/redefinir_senha';
import AdicionarServico from './adm/pages/adicionar_servico';
import Inicio from './inicio/inicio';

/**
 * Renders the `Item` component if the user is signed in, otherwise renders the `Signin` component.
 * @param {React.ComponentType} Item - The component to render if the user is signed in.
 * @returns {JSX.Element} - The rendered component.
 */
// const Private = ({ Item }: { Item: React.ComponentType }): JSX.Element => {
  
//   const { signed }: { signed: Number } = useAuth();
//   return signed > 0 ? <Item /> : <Signin />;
// };

const Rotas = (): JSX.Element => {
    return(

        <AuthProvider>
            <Router>
                <React.Fragment>  
                    <Routes>
                        <Route path="Todos_chamados" element={<ChamadosList />} />
                        <Route path="/inicio" element={<Inicio />} />
                        <Route path="/" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/tecnico/Login_Tecnico" element={<LoginTecnico/>} /> 
                        <Route path="/adm/Login_Adm" element={<LoginAdm/>} />
                        <Route path="/usuario" element={<BaseUsuario />}>
                            <Route path="Meu_painel" element={<Painel />} />
                            <Route path="Duvidas" element={<Duvidas />} />
                            <Route path="Abrir_chamado" element={<Formulario/>} />
                            <Route path="Meus_chamados" element={<ChamadosUsuarios/>} />
                            <Route path="Sucesso" element={<ChamadoEnviado />} /> 
                        </Route>
                        <Route path="/adm" element={<BaseAdm />}>
                            <Route path="Usuarios" element={<UsuariosList />} /> 
                            <Route path="Ferramentas" element={<Ferramentas />} />        
                            <Route path="Admin" element={<Admin />} />    
                            <Route path="Chamados" element={<ChamadosList />} />
                            <Route path="Criar_usuario" element={<CriaUsuario />} />
                            <Route path="Adicionar_serviço" element={<AdicionarServico />} />
                            <Route path="Adicionar_ferramenta" element={<AdicionaFerramenta />} />
                            <Route path="Redefinir_senha" element={<RedefineSenha />} />                              

                                
                        </Route>
                        <Route path="/tecnico" element={<BaseTecnico />}>
                            <Route path="Painel_tecnico" element={<PainelTec />} /> 
                            <Route path="Ferramentas_tec" element={<FerramentasTec />} />        
                            <Route path="Ativos" element={<ChamadosAtivos />} />    
                            <Route path="Chamados_tec" element={<ChamadosTec />} />   
                        </Route>
                    </Routes>
                </React.Fragment>
            </Router>
        </AuthProvider> 
    );
    };
      
    export default Rotas;