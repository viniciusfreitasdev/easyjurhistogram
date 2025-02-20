require('dotenv').config();
const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

const { Client } = require("@elastic/elasticsearch");
const esClient = new Client({
  node: process.env.URL,
  auth: { apiKey: process.env.TOKEN }
});

// Função para criar URL do gráfico com QuickChart
function createChartUrl(labels, data) {
  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantidade de Documentos",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
    },
  };

  // Gera a URL para o QuickChart API
  const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));
  return `https://quickchart.io/chart?c=${encodedConfig}`;
}

// Rota para buscar a distribuição temporal dos documentos
app.get('/histograma', async (req, res) => {
  try {
    const index = process.env.INDEX;

    const body = await esClient.search({
      index,
      body: {
        size: 0,
        aggs: {
          distribuicao_temporal: {
            date_histogram: {
              field             : "data_julgamento",
              calendar_interval : "year", //"day" "month" "year"
              format: "yyyy" // yyyy-MM-dd (day), yyyy-MM (month), yyyy (year)
            }
          }
        }
      }
    });

    // Processando os resultados da agregação ( Resposta para API )
    // const histograma = body.aggregations.distribuicao_temporal.buckets.map(bucket => ({
    //   periodo: bucket.key_as_string,
    //   quantidade: bucket.doc_count
    // }));

    // Pega os dados capturados do ElasticSearch e organiza em arrays para popular o gráfico
    const labels = body.aggregations.distribuicao_temporal.buckets.map((bucket) => bucket.key_as_string);
    const date   = body.aggregations.distribuicao_temporal.buckets.map((bucket) => bucket.doc_count    );

    // Criando o gráfico
    const chart = createChartUrl(labels, date);

    // Retornar o HTML com um iframe do gráfico
    const html = `
      <html>
        <body>
          <h2>Histograma da Distribuição Temporal</h2>
          <iframe 
            src="${chart}" 
            style="width: 100%; height: 100%;"
            frameborder="0">
          </iframe>
        </body>
      </html>
    `;
    res.send(html);

  } catch (error) {
    console.error("Erro ao gerar histograma:", error);
    res.status(500).json({ error: "Erro ao processar dados." });
  }
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
