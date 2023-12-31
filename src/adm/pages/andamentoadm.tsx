
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  mensagem: string;
  dataAberturaChamado: string;
  idSuporte: string;
  idUsuario: number;
  idLab: number;
  idComputador: number;
  resposta: string;

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
  const [resposta, setResposta] = useState("");
  
  
  const [chamados, setChamados] = useState<Chamado[]>([]);
  
  const handleClick = async () => {
    try {
      const chamadoId = chamado?.id;
      if (chamadoId) {
        const data = {
          idPrioridade: Number(idPrioridade), // Converta para número
        };
        const response = await axios.patch(`http://localhost:3000/chamados/${chamadoId}`, data);
        if (response.status === 200) {
          localStorage.setItem(`prioridade_${id}`, 'true');
          localStorage.setItem(`idPrioridade_${id}`, idPrioridade); // Adicione esta linha
          setButtonText("Atribuída");
          navigate("/adm/Chamados");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/chamados/${id}`);
        setChamado(response.data);
        setResposta(response.data.mensagem); 
        const prioridadeSelecionada = localStorage.getItem(`prioridade_${id}`);
        const idPrioridadeSalvo = localStorage.getItem(`idPrioridade_${id}`);
        if (prioridadeSelecionada) {
          setButtonText("Atualizada");
        }
        setidPrioridade(idPrioridadeSalvo || String(response.data.prioridade.idPrioridade)); // Mova esta linha para fora do if
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

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
          <select
            value={idPrioridade}
            onChange={(e) => setidPrioridade(e.target.value)}
            disabled={buttonText === "Atualizada"}
          >
            <option value="0">Selecione...</option>
            <option value="1">Baixa</option>
            <option value="2">Média</option>
            <option value="3">Alta</option>
          </select>
         
        </div>
        <div className="buttomcontainer">
        {buttonText !== "Atualizada" && (
          <button onClick={handleClick}>
            {buttonText}
          </button>
        )}
        </div>
        </div>
        

        <div className="LabelS">
          <label>Andamento</label>
          <textarea
            className="descricao-input"
            placeholder="Resposta"
            value={resposta} 
            readOnly
          ></textarea>
        </div>
        
      </div>
    <div/>
    </div>
    
  );
};

export default AndamentoAdm;

