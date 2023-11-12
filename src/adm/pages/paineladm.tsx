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
Chart.register(CategoryScale, LinearScale, BarElement);

interface Chamado {
  id: number;
  nomeChamado: string;
  descChamado: string;
  dataAberturaChamado: string;
  idSuporte: string;
  usuario: {
    id: number;
    nomeUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
  };
  andamento: {
    idAndamento: number,
    descAndamento: string
    prioridadeAndamento: string
  };
  suporte: {
    id: number,
    nomeUsuario: string 
  };
  prioridade: {
    idPrioridade: number;
    descPrioridade: string;
  };
};

function PainelAdm() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

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
        const chamadosData = responses.flatMap(response => response.data);
        setChamados(chamadosData);        
        const counts = responses.map(response => response.data.length);
        setCounts(counts);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
      
    fetchData();
  }, []);

  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: "Chamados Novos",
        data: Array(12).fill(counts[0]),
        backgroundColor: "yellow",
        borderWidth: 1,
        borderColor: "#000000",
      },
      {
        label: "Chamados Abertos",
        data: Array(12).fill(counts[1]),
        backgroundColor: "green",
        borderWidth: 1,
        borderColor: "#000000",
      },
      {
        label: "Chamados Atrasados",
        data: Array(12).fill(counts[2]),
        backgroundColor: "red",
        borderWidth: 1,
        borderColor: "#000000",
      },
      {
        label: "Chamados Concluídos",
        data: Array(12).fill(counts[3]),
        backgroundColor: "blue",
        borderWidth: 1,
        borderColor: "#000000",
      }
    ]
  }
  
  return (
    <div>
      <h2>Status dos Chamados por mês</h2>
      <div>
      <MDBContainer>
        <Bar data={data} style={{ maxHeight: '600px' }} />
      </MDBContainer>
      </div>  
      <hr></hr>
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
    </div>
  );
}

export default PainelAdm;
