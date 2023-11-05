
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  idSuporte: string;
  idUsuario: number;
  idLab: number;
  idComputador: number;
  usuario: {
    id: number;
    nomeUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
  };
  andamento: {
    idAndamento: number;
    descAndamento: string;
    prioridadeAndamento: string;
    respostaChamado: string;
  };
  suporte: {
    id: number;
    nomeUsuario: string;
  };
  prioridade: {
    idPrioridade: number;
    descPrioridade: string;
  };
}

function AndamentoAdm() {
  
  const { id } = useParams<{ id: string, prioridade: string }>();
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Button = ({ Text, onClick }: { Text: string, onClick: () => void }) => <button onClick={onClick}>{Text}</button>;
  const [idPrioridade, setidPrioridade] = useState<string>('');
  const [buttonText, setButtonText] = useState("Atualizar");
  
  
  const [chamados, setChamados] = useState<Chamado[]>([]);
  
  const handleClick = async () => {
    try {
      const chamadoId = chamado?.id;
      if (chamadoId) {
        const data = {
          idPrioridade: Number(idPrioridade), // Converta para número
        };
        console.log("Dados do formulário:", data); // Log the form data
        const response = await axios.patch(`http://localhost:3000/chamados/${chamadoId}`, data);
        console.log("Resposta:", response); // Log the response
        if (response.status === 200) {
          // Atualize a mensagem do botão
          setButtonText("Atualizado");
          setidPrioridade(String(response.data.prioridade.idPrioridade)); // Adicione esta linha
          navigate("/adm/Chamados");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const formatarData = (data: string) => {
    const dataAbertura = new Date(data);
    const dia = String(dataAbertura.getDate()).padStart(2, "0");
    const mes = String(dataAbertura.getMonth() + 1).padStart(2, "0");
    const ano = String(dataAbertura.getFullYear()).slice(-2);
    const hora = String(dataAbertura.getHours()).padStart(2, "0");
    const minutos = String(dataAbertura.getMinutes()).padStart(2, "0");
    const segundos = String(dataAbertura.getSeconds()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/chamados/${id}`);
        setChamado(response.data);
        setidPrioridade(String(response.data.prioridade.idPrioridade)); // Adicione esta linha
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
   

  return (
    <div className="LabelS">
    <span className="description"><h2>Chamado nº </h2></span>
    <input
      type="text"
      placeholder=""
      value={chamado ? chamado.id : ""}
      readOnly
    />
      <hr />
      {/* {chamado.id} */}
      <div className="containerForm">
        <div className="LabelS">
          <span className="description">Nome do usuário</span>
          <input
            type="text"
            placeholder=""
            value={chamado && chamado.usuario ? chamado.usuario.nomeUsuario : ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <span className="description">Data da abertura</span>
          <input
            type="text"
            placeholder=""
            value={chamado ? formatarData(chamado.dataAberturaChamado) : ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <span className="description">Assunto</span>
          <input
            type="text"
            placeholder=""
            value={chamado ? chamado.nomeChamado : ""}
            readOnly
          />
        </div>

        <div className="LabelS">
          <label>Descrição</label>
          <textarea
            className="descricao-input"
            placeholder=""
            value={chamado ? chamado.descChamado: ""}
            readOnly
          ></textarea>
        </div>

        <div className="LabelS">
          <span className="description">Sala</span>
          <input
            type="text"
            placeholder="idLab"
            value={chamado ? chamado.idLab: ""}
            readOnly
          />
        </div>
        <div className="LabelS">
          <span className="description">Dispositivo</span>
          <input
            type="text"
            placeholder="idComputador"
            value={chamado ? chamado.idComputador: ""}
            readOnly
          />
        </div>
        
        
        <div className="checkbox-group">
        <div className="LabelSt">
          <span className="description">Status</span>
          <input
            type="text"
            placeholder="status"
            value={chamado && chamado.andamento ? chamado.andamento.descAndamento : ""}
            readOnly
          />
        </div>
        <div className="LabelS">
          <span className="description">Técnico Responsável</span>
          <input
            type="text"
            placeholder="Técnico"
            value={chamado && chamado.suporte ? chamado.suporte.nomeUsuario : ""}
            readOnly
          />
        </div>
        <div className="LabelS">
          <span className="description">Prioridade</span>
          <input
            type="text"
            placeholder="Prioridade"
            value={chamado && chamado.prioridade ? chamado.prioridade.descPrioridade : ""}
            readOnly
          />
        </div>
        <div className="LabelS">
          <span className="description">Atribuir Prioridade</span>
            <select
              value={idPrioridade}
              onChange={(e) => setidPrioridade(e.target.value)}
            >
              <option value="0">Selecione...</option>
              <option value="1">Baixa</option>
              <option value="2">Média</option>
              <option value="3">Alta</option>
            </select>
         
        </div>
        <div className="buttomcontainer">
          <Button Text={buttonText} onClick={handleClick} />
        </div>
        </div>
        

        <div className="LabelS">
          <label>Andamento</label>
          <textarea
            className="descricao-input"
            placeholder="Andamento do chamado"
            value={chamado && chamado.andamento ? chamado.andamento.respostaChamado : ""}
            readOnly
          ></textarea>
        </div>
        
      </div>
    <div/>
    </div>
    
  );
};

export default AndamentoAdm;

