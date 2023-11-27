import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/estilos.css";
import "../../css/table.css";
import '@fortawesome/fontawesome-free/css/all.min.css';  
import 'bootstrap-css-only/css/bootstrap.min.css';  
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import Modal from 'react-bootstrap/Modal';
Chart.register(CategoryScale, LinearScale, BarElement);

type ChartDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
  }[];
};


interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  mensagem: string;
  dataAberturaChamado: string;
  tratFim: string;
  idSuporte: string;
  idUsuario: number;
  idLab: number;
  idComputador: number;
  resposta: string;
  urlIndex?: number;

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

const PainelAdm: React.FC = () => {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const [mesFiltro, setMesFiltro] = useState<number | null>(null);
  const [statusFiltro, setStatusFiltro] = useState<string | null>(null);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState<string | null>(null);
  const [anoFiltro, setAnoFiltro] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [chartData, setChartData] = useState<ChartDataType | null>(null);
  

  useEffect(() => {
    const urls = [
      'http://localhost:3000/chamados/andamento/1',
      'http://localhost:3000/chamados/andamento/2',
      'http://localhost:3000/chamados/andamento/3',
      'http://localhost:3000/chamados/andamento/4'
    ];

  

    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const chamadosData = responses.flatMap((response, index) => response.data.map((chamado: Chamado) => ({ ...chamado, urlIndex: index })));
        setChamados(chamadosData);
        const counts = responses.map(response => response.data.length);
        setCounts(counts);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const processarDadosDoGrafico = () => {
      const counts: { [key: string]: number[] } = {
        "Chamados Novos": Array(12).fill(0),
        "Chamados Abertos": Array(12).fill(0),
        "Chamados Atrasados": Array(12).fill(0),
        "Chamados Concluídos": Array(12).fill(0),
      };
  
      const statusMapping: { [key: number]: string } = {
        0: "Chamados Novos",
        1: "Chamados Abertos",
        2: "Chamados Atrasados",
        3: "Chamados Concluídos",
      };
  
      chamados.forEach(chamado => {
        const month = new Date(chamado.dataAberturaChamado).getMonth();
        const status = statusMapping[chamado.urlIndex!];
        if (counts[status]) {
          counts[status][month]++;
        }
      });
  
      setChartData({
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: Object.entries(counts).map(([status, data]) => ({
          label: status,
          data,
          backgroundColor: status === "Chamados Novos" ? "yellow" : status === "Chamados Abertos" ? "green" : status === "Chamados Atrasados" ? "red" : "blue",
          borderWidth: 1,
          borderColor: "#000000",
        }))
      });
    };
  
    if (chamados.length > 0) {
      processarDadosDoGrafico();
    }
  }, [chamados]);
  const filtrarChamados = () => {
    let chamadosFiltrados = chamados;

    if (!mesFiltro && !anoFiltro && !statusFiltro && !prioridadeFiltro) {
      return chamados
        .sort((a, b) => new Date(b.dataAberturaChamado).getTime() - new Date(a.dataAberturaChamado).getTime())
        .slice(0, 5);
    }
  
    if (mesFiltro) {
      chamadosFiltrados = chamadosFiltrados.filter(chamado => {
        const mesChamado = new Date(chamado.dataAberturaChamado).getMonth() + 1;
        return mesChamado === mesFiltro;
      });
    }
  
    if (anoFiltro) {
      chamadosFiltrados = chamadosFiltrados.filter(chamado => {
        const anoChamado = new Date(chamado.dataAberturaChamado).getFullYear();
        return anoChamado === anoFiltro;
      });
    }
  
    if (statusFiltro) {
      chamadosFiltrados = chamadosFiltrados.filter(chamado => {
        return chamado.andamento.descAndamento === statusFiltro;
      });
    }
  
    if (prioridadeFiltro) {
      chamadosFiltrados = chamadosFiltrados.filter(chamado => {
        return chamado.prioridade.descPrioridade === prioridadeFiltro;
      });
    }
  
    return chamadosFiltrados;
  };
  const exportarChamadosParaCSV = (chamados: Chamado[]) => {
    const dadosCSV = chamados.map(chamado => ({
      id: chamado.id,
      nomeChamado: chamado.nomeChamado,
      descChamado: chamado.descChamado,
      dataAberturaChamado: formatarData(chamado.dataAberturaChamado),
      tratFim: formatarData(chamado.tratFim),
      idSuporte: chamado.idSuporte,
      idUsuario: chamado.idUsuario,
      idLab: chamado.idLab,
      idComputador: chamado.idComputador,
      resposta: chamado.resposta,
      nomeUsuario: chamado.usuario.nomeUsuario,
      emailUsuario: chamado.usuario.emailUsuario,
      telefoneUsuario: chamado.usuario.telefoneUsuario,
      descAndamento: chamado.andamento.descAndamento,
      prioridadeAndamento: chamado.andamento.prioridadeAndamento,
      respostaChamado: chamado.andamento.respostaChamado,
      nomeSuporte: chamado.suporte ? chamado.suporte.nomeUsuario : '', // Adicionei a verificação aqui
      descPrioridade: chamado.prioridade.descPrioridade,
    }));
  
    const csv = Papa.unparse(dadosCSV);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'chamados.csv');
    link.click();
  };

  const exportarChamadosParaExcel = (chamados: Chamado[]) => {
    const dadosExcel = chamados.map(chamado => ({
      id: chamado.id,
      nomeChamado: chamado.nomeChamado,
      descChamado: chamado.descChamado,
      dataAberturaChamado: formatarData(chamado.dataAberturaChamado),
      tratFim: formatarData(chamado.tratFim),
      idSuporte: chamado.idSuporte,
      idUsuario: chamado.idUsuario,
      idLab: chamado.idLab,
      idComputador: chamado.idComputador,
      resposta: chamado.resposta,
      nomeUsuario: chamado.usuario.nomeUsuario,
      emailUsuario: chamado.usuario.emailUsuario,
      telefoneUsuario: chamado.usuario.telefoneUsuario,
      descAndamento: chamado.andamento.descAndamento,
      prioridadeAndamento: chamado.andamento.prioridadeAndamento,
      respostaChamado: chamado.andamento.respostaChamado,
      nomeSuporte: chamado.suporte ? chamado.suporte.nomeUsuario : '', // Adicionei a verificação aqui
      descPrioridade: chamado.prioridade.descPrioridade,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Chamados');
    XLSX.writeFile(workbook, 'chamados.xlsx');
  };  

  const formatarData = (data: string | null) => {
    if (data === null) {
      return "Data desconhecida";
    }
  
    const dataAbertura = new Date(data);
    const dia = String(dataAbertura.getDate()).padStart(2, "0");
    const mes = String(dataAbertura.getMonth() + 1).padStart(2, "0");
    const ano = String(dataAbertura.getFullYear()).slice(-2);
    const hora = String(dataAbertura.getHours()).padStart(2, "0");
    const minutos = String(dataAbertura.getMinutes()).padStart(2, "0");
    const segundos = String(dataAbertura.getSeconds()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
  };



return (
    
      <div>
        <h2>Status dos Chamados por mês</h2>
        <div>
        <MDBContainer>
        {chartData && (console.log(chartData), <Bar data={chartData} options={{ maintainAspectRatio: false }}/>)}
        </MDBContainer> 
        
        </div>  
  
        <div className="containerBoxes">
          <div className="box" id="box2">
            <div className="box-content">
              <h2>Chamados Novos</h2>
              <h2>{counts[0]}</h2>
            </div>
          </div>
  
          <div className="box" id="box3">
            <div className="box-content">
              <h2>Chamados Abertos</h2>
              <h2>{counts[1]}</h2>
            </div>
          </div>
  
          <div className="box" id="box1">
            <div className="box-content">
              <h2>Chamados atrasados</h2>
              <h2>{counts[2]}</h2>
            </div>
          </div>
          <div className="box" id="box4">
            <div className="box-content">
              <h2>Chamados Concluídos</h2>
              <h2>{counts[3]}</h2>
            </div>
          </div>
        </div>
  
           
        
        <div className="select-container">
  
          <select onChange={e => setAnoFiltro(Number(e.target.value))}>
          <option value="">Selecione o ano</option>        
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          </select>
          <select onChange={e => setMesFiltro(Number(e.target.value))}>
            <option value="">Selecione o mês</option>,
            <option value="1">Janeiro</option>,
            <option value="2">Fevereiro</option>,
            <option value="3">Março</option>,
            <option value="4">Abril</option>,
            <option value="5">Maio</option>,
            <option value="6">Junho</option>,
            <option value="7">Julho</option>,
            <option value="8">Agosto</option>,
            <option value="9">Setembro</option>,
            <option value="10">Outubro</option>,
            <option value="11">Novembro</option>,
            <option value="12">Dezembro</option>,                 
          </select>
  
          <select onChange={e => setStatusFiltro(e.target.value)}>
            <option value="">Selecione o status</option>
            <option value="Novo">Novo</option>
            <option value="Aberto">Aberto</option>
            <option value="Atrasado">Atrasado</option>
            <option value="Concluído">Concluído</option>          
          </select>
  
          <select onChange={e => setPrioridadeFiltro(e.target.value)}>
            <option value="">Selecione a prioridade</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>                
          </select>
          
          <button onClick={() => setModalVisible(true)}>Exportar</button>
        
        </div>
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Exportar dados</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button className="btn-export" onClick={() => {exportarChamadosParaExcel(filtrarChamados()); setModalVisible(false);}}>Exportar para Excel</button>
            <button className="btn-export" onClick={() => {exportarChamadosParaCSV(filtrarChamados()); setModalVisible(false);}}>Exportar para CSV</button>
          </Modal.Body>
        </Modal>
  
        <hr></hr>      
        
        <hr></hr>
        <table>
          <thead>
            <tr>
              <th>Número do Chamado</th>
              <th>Assunto</th>
              <th>Técnico Responsável</th>
              <th>Data da abertura</th>
              <th>Nome do usuario</th>
              <th>E-mail do Usuário</th>
              <th>Status</th>
              <th>Prioridade</th>
            </tr>
            </thead>
        <tbody>
        {filtrarChamados()
        .sort((a, b) => new Date(b.dataAberturaChamado).getTime() - new Date(a.dataAberturaChamado).getTime())
        .map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>{chamado.nomeChamado}</td>
              <td>{chamado.suporte ? chamado.suporte.nomeUsuario : ''}</td> 
              <td>{formatarData(chamado.dataAberturaChamado)}</td>
              <td>{chamado.usuario.nomeUsuario}</td>
              <td>{chamado.usuario.emailUsuario}</td>
              <td>{chamado.andamento.descAndamento}</td> 
              <td>{chamado.prioridade.descPrioridade}</td>           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  
  export default PainelAdm; 
  


  
