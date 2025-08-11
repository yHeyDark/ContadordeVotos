const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

// Função para ler o arquivo de dados
function readData() {
  try {
    console.log("Tentando ler o arquivo de dados...");
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo de dados:", error);
    return [];
  }
}

// Função para escrever no arquivo de dados
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao escrever no arquivo de dados:", error);
  }
}

module.exports = {
  readData,
  writeData
};