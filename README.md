<h1 align="center"><img src="./.github/logo.jpg" width="200px"/></h1>

<h3 align="center">School Manager</h3>

<p align="center">“O que sabemos é uma gota. O que não sabemos é um oceano.”</p>

<p align="center">
  <a href="#about">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#install">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#challenge">Desafios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Tecnologias</a>
</p>

## :speech_balloon: Sobre <a name="about"></a>
> Gerenciador escolar. Nele você poderá cadastrar/editar/remover professores e alunos de forma a relacionar cada aluno a um professor específico.

<div align="center">
  <img src="./.github/school-manager.gif"></img>
</div>

## :warning: Instalação <a name="install"></a>
> Esse projeto usa o SGBD postgreSQL. Segue as querys para funcionamento:

```sh
CREATE DATABASE schoolmanager;

CREATE TABLE teachers(
  id serial primary key,
  avatar_url text not null,
  name text not null,
  birth_date timestamp not null,
  education_level text not null,
  class_type text not null,
  subjects_taugth text not null,
  created_at timestamp not null);

CREATE TABLE students(
  id serial primary key,
  avatar_url text not null,
  name text not null,
  email text not null,
  birth_date timestamp not null,
  gender text not null,
  education_year text not null,
  hours_studied int not null,
  teacher_id int not null);

Observação: Configurar os dados de seu SGBD em 'src/config/db.js'
```

> Depois de configurar o SGDB, instalar as dependências do projeto:

```sh
npm install # instala as dependências...
npm start # roda o projeto...
```

## :triangular_flag_on_post: Desafio <a name="challenge"></a>
> Aprender rotas, banco de dados e lógica de paginação...

## :heavy_check_mark: Tecnologias <a name="technologies"></a>

- PostgreSQL
- Nunjucks
- Express

---

by [Douglas Scaini](https://www.github.com/douglasscaini)