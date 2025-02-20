# Easyjur Histogram
**API para visualização da distribuição temporal de documentos jurídicos via histograma**  

---

## **Objetivo**  
Desenvolver uma solução que gera automaticamente um histograma interativo mostrando a distribuição de documentos jurídicos ao longo do tempo, utilizando o campo `data_julgamento` de um índice ElasticSearch.

---

## **Funcionalidades**  
- Agregação temporal de documentos por ano/mês/dia (configurável)  
- Geração automática de gráficos com QuickChart.io  
- Visualização embedável em HTML via iframe  
- Suporte a três granularidades temporais:
  - Anual (padrão)
  - Mensal
  - Diária

---

## **Instalação**  
1. Clone o repositório:  
```bash  
git clone https://github.com/seu-usuario/nome-repositorio.git  
cd nome-repositorio  
```  

2. Instale as dependências:  
```bash  
npm install  
```  

3. Configure o ambiente (crie um arquivo `.env`):  
```env  
URL="sua_url_elasticsearch"  
TOKEN="seu_token_api"  
INDEX="nome_do_indice"  
PORT=3000  
```  

4. Inicie o servidor:  
```bash  
npm start  
```  

---

## **Como Usar**  
Acesse o endpoint com o parâmetro opcional `intervalo` (year/month/day):  
```  
http://localhost:3000/histograma?intervalo=year  
```  

### Saída Esperada:  
Página HTML contendo um gráfico de barras interativo com a distribuição temporal dos documentos.

---

## **Tecnologias Utilizadas**  
- **Elasticsearch**: Agregação e armazenamento de dados  
- **QuickChart.io**: Geração dinâmica de visualizações  
- **Express.js**: Framework para construção da API  
- **dotenv**: Gerenciamento de configurações  

---

## **Disclaimer**  
📊 **Avisos Importantes**:
- Este projeto é para fins demonstrativos.
- Requer campo `data_julgamento` formatado corretamente no ElasticSearch  
- A qualidade do gráfico depende da precisão das datas nos documentos  
- O uso do QuickChart.io requer conexão com internet  
- Intervalos muito pequenos (dia) podem gerar gráficos com muitos elementos  
- Mantenha as credenciais do ElasticSearch protegidas no arquivo `.env`  
