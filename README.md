# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="assets/logo-fiap.png" alt="FIAP - Faculdade de Informática e Administração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

### Global Solution - 1º Semestre

# Grupo 52


## 👨‍🎓 Integrantes:
- <a href="https://www.linkedin.com/in/ederson-badeca/">Ederson Luiz Badeca</a> 

## 👩‍🏫 Professores:
### Tutor(a) 
- <a href="https://www.linkedin.com/in/lucas-gomes-moreira-15a8452a/">Lucas Gomes</a>
### Coordenador(a)
- <a href="https://www.linkedin.com/in/profandregodoi/">André Godoi Chiovato</a>

## 📜 Descrição

### Sistema Residencial Inteligente para Otimização do Consumo Energético
Este projeto é um sistema integrado para **gerenciamento e otimização do consumo energético em residências**, combinando **Python** no backend com **ReactJS** no frontend. A aplicação monitora dispositivos domésticos, calcula o consumo energético e apresenta relatórios interativos e dicas para eficiência energética. Com foco em sustentabilidade e economia, o sistema prioriza decisões baseadas em dados em tempo real.

---

## **Recursos Principais**

### **Backend (Python com Flask)**
- API REST para gerenciar dispositivos, consumo energético e tarifas.
- Banco de dados PostgreSQL para armazenar informações de dispositivos, histórico de consumo e dados tarifários.
- Algoritmos para calcular:
  - Consumo em kWh.
  - Custos com base na tarifa atual.
- Endpoints dinâmicos para fornecer dados ao frontend.

### **Frontend (ReactJS)**
- Interface responsiva usando **Material-UI**.
- Tabela interativa para exibição de dispositivos e consumos.
- Gráficos dinâmicos com **Victory** para visualizar tendências de consumo e custo.
- Dicas personalizadas para eficiência energética com base em dispositivos selecionados.

---

## **Funcionalidades**

1. **Monitoramento de Consumo em Tempo Real:**
   - Exibição de dispositivos, consumo (em kWh) e custo estimado (em R$).

2. **Relatórios Interativos:**
   - Tabelas ordenáveis e gráficos dinâmicos para análise detalhada do consumo energético.

3. **Dicas de Eficiência Energética:**
   - Recomendações específicas para reduzir desperdícios e melhorar a durabilidade dos dispositivos.

4. **Visualização de Tendências:**
   - Gráficos que mostram a evolução do consumo e custos ao longo do tempo.

---

## **Como Configurar o Projeto**

### **Requisitos**
- **Backend:**
  - Python 3.8 ou superior.
  - PostgreSQL 13 ou superior.
  - Bibliotecas: Flask, SQLAlchemy, Psycopg2.
  - Docker e Docker Compose (opcional).

- **Frontend:**
  - Node.js 16 ou superior.
  - NPM ou Yarn para gerenciamento de pacotes.
  - Dependências: React, Material-UI, Victory.

### **Passos para Configuração**

#### Clone o Repositório
```bash
git clone https://github.com/seu-user/fiap-global-solution.git
cd fiap-global-solution/src/backend
```
#### Configuração do Backend
Crie um ambiente virtual:
```bash
python -m venv venv
source venv/bin/activate
```
#### Instale as dependências:
```bash
pip install -r requirements.txt
```
#### Configure o Banco de Dados:
```bash
  docker-compose up -d
```

#### Execute o Backend:
```bash
python app.py
```
#### Crie os Dados:
```bash
POST http://127.0.0.1:8080/device
Accept: application/json
Content-Type: application/json

{
  "device": "My Device",
  "potency": "200",
  "usage_time": "8"
}
```

#### Busque o consumo:
```bash
GET http://127.0.0.1:8080/consumption
Accept: application/json
Content-Type: application/json
```
#### Importe os Dados:
disponibilizamos um arquivo com dados para importação que pode ser acessado [documents](document/aparelhos_potencia_extended.csv)


```bash
#### Configuração do Frontend
```bash
cd ../frontend
npm install
npm start
```





## 📋 Licença

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/agodoi/template">MODELO GIT FIAP</a> por <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://fiap.com.br">Fiap</a> está licenciado sobre <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
