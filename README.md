# Simulador de Votação de Filmes/Séries

## 📝 Objetivo

Este projeto consiste em um sistema de votação interativo para filmes e séries. O objetivo é permitir que os usuários votem em uma lista de conteúdos, registrando votos positivos e negativos. O sistema também permite o cadastro de novos filmes, armazena os dados de forma persistente e exibe os totais de votos por item e no geral.

## ✨ Funcionalidades Obrigatórias

O sistema foi desenvolvido para cumprir as seguintes funcionalidades:

### 1\. Exibição de Itens

  * Exibir uma lista de pelo menos 5 filmes ou séries inicialmente.
  * Cada item exibido contém: Título, Gênero, Descrição e uma Imagem.
  * Botões "Gostei" e "Não Gostei" para votação.

### 2\. Votação

  * Ao clicar nos botões "Gostei" ou "Não Gostei", o contador de votos por item é atualizado imediatamente.
  * Os votos são armazenados por item e não se perdem ao reiniciar a aplicação.
  * Exibição de totais de votos positivos e negativos por item.
  * Exibição do total geral de votos positivos e negativos na página.

### 3\. Cadastro de Filmes/Séries

  * Uma aba com um formulário que permite o cadastro de novos filmes ou séries.
  * Campos obrigatórios para o cadastro: Título, Gênero e Imagem (URL).
  * O campo de Descrição é opcional.
  * Novos itens são exibidos com os votos zerados e ficam disponíveis para votação imediatamente.

### 4\. Armazenamento de Dados

  * Os dados de filmes, séries e votos são persistidos para que não se percam após recarregar ou reiniciar a aplicação[cite: 41, 47, 52]. O projeto utiliza um arquivo `.json` como banco de dados.

## 🛠️ Tecnologias Utilizadas

  * **Front-end:** HTML, CSS, JavaScript.
  * **Back-end (API):** Node.js com o framework Express.
  * **Persistência de Dados:** Arquivo `.json`.

## ⚙️ Estrutura de Dados

A estrutura de dados para cada item de filme ou série segue os seguintes campos:

  * `id`: Identificador único.
  * `título`: Nome do filme ou série.
  * `gênero`: Gênero do conteúdo.
  * `descrição`: Breve descrição do filme.
  * `imagem`: URL da imagem.
  * `gostei`: Total de votos positivos.
  * `naoGostei`: Total de votos negativos.

## 🚀 Instruções de Instalação e Execução

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/download/) instalado em sua máquina.

### Configuração do Projeto

1.  Clone este repositório para sua máquina local.

    ```bash
    git clone [https://github.com/yHeyDark/ContadordeVotos]
    ```

2.  Navegue até a pasta do projeto e instale as dependências do back-end.

    ```bash
    cd [projeto-votacao]/backend
    npm install
    ```

    *Se você encontrar um erro de "Execution Policies", abra o PowerShell como administrador e execute `Set-ExecutionPolicy RemoteSigned`.*

3.  Inicie o servidor do back-end.

    ```bash
    node server.js
    ```

    O servidor estará rodando em `http://localhost:3000`.

### Executando o Front-end

1.  Abra um **segundo terminal** na **raiz do projeto** (`[projeto-votacao]`).
2.  Instale o pacote `http-server` para hospedar os arquivos estáticos.
    ```bash
    npm install -g http-server
    ```
3.  Inicie o servidor do front-end.
    ```bash
    http-server frontend/
    ```
4.  Abra seu navegador e acesse `http://localhost:8080`.

## 📦 Instruções de Entrega
