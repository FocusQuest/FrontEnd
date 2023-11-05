function Inicio(){
    return (
        <div>
            
            <div className="content1">
                    <h2>Sistema Acadêmico de TI (SAT)</h2>
                </div>
            <div>

                <div className="background-image">
            </div>

                <div className="content2">
                    <p>Bem-vindo ao sistema de helpdesk do SAT.<br></br>
                        Por favor, selecione o seu perfil:</p>
                </div>

                <div className="content3">         
                
                    <div className="botãobonito"><button id="user-btn">Usuário</button></div>
                    <br></br>
                    <div className="botãobonito"><button id="tech-btn">Técnico</button></div>
                    <br></br>
                    <div className="botãobonito"><button id="admin-btn">Administrador</button></div>
                    </div>

                </div>
        </div>
    )
}

export default Inicio;