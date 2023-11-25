import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  mensagem: string;
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

function AndamentoTecnico() {
  
  const { id } = useParams<{ id: string, prioridade: string }>();
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [resposta, setResposta] = useState(""); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState("");
  const [buttonText2, setButtonText2] = useState("");
  const [isRespondido, setIsRespondido] = useState(false);

  const handleClaimChamado = async () => {    
    const idTecnico = localStorage.getItem("idUsuario")!;
    try {
      const response = await axios.patch(`http://localhost:3000/chamados/${id}`, {
        idSuporte: parseInt(idTecnico),
        idAndamento: 2,
        tratInicio: "",
      });
      if (response.status === 200) {
        setButtonText("Chamado assumido");
        localStorage.setItem(`assumido_${id}`, 'true');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResponderChamado = async () => { 
    try {
      localStorage.setItem(`resposta_${id}`, resposta);
      localStorage.setItem(`respondido_${id}`, 'true');
      const response = await axios.patch(`http://localhost:3000/chamados/${id}`, {
        mensagem: resposta,
        idAndamento: 4,
        tratFim: ""
      });
      if (response.status === 200) {
        setButtonText2("Concluído");
        setChamado(prevState => {
          if (prevState === null) {
            return null;
          }
          return { ...prevState, mensagem: response.data.mensagem };
        }); 
        setIsRespondido(true); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chamados/${id}`);
        setChamado(response.data);
        setIsLoading(false);
        const respostaSalva = localStorage.getItem(`resposta_${id}`);
        const respondido = localStorage.getItem(`respondido_${id}`);
        const assumido = localStorage.getItem(`assumido_${id}`);
        if (respostaSalva) {
          setResposta(respostaSalva);
        }
        if (respondido) {
          setIsRespondido(true);
          setButtonText2("Concluído");
        }
        if (assumido) {
          setButtonText("Chamado assumido");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

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
        <div className="LabelSt">
          <span className="description">Prioridade</span>
          <input
            type="text"
            placeholder="prioridade"
            value={chamado && chamado.prioridade ? chamado.prioridade.descPrioridade: ""}
            readOnly
          />
        </div>
        <button onClick={handleClaimChamado}>{buttonText || "Assumir chamado"}</button>
        </div>
       
        
        <div className="LabelS">
          <label>Andamento</label>
          <textarea
            className="descricao-input"
            placeholder="Responder chamado"            
            onChange={e => setResposta(e.target.value)} 
            value={resposta}
            disabled={isRespondido}
          ></textarea>
          </div>
          <button onClick={handleResponderChamado} disabled={isRespondido}>
            {isRespondido ? "Concluído" : buttonText2 || "Responder"}
          </button>
      </div>
    <div/>
    </div>
  );
};
  

export default AndamentoTecnico;