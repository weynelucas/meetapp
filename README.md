# Meetapp
App agregador de eventos para desenvolvedores

# Ambiente 
A aplicação foi construída e testada com o seguinte ambiente

- Versão do Node JS: 10.16.3
- Banco de dados: PostgreSQL
- Plataforma mobile: iOS

# Instalação
É altamente recomendado utilizar o [Yarn](https://yarnpkg.com/lang/en/) para a instalação das dependências de cada projeto (backend, frontend e mobile).

Antes de qualquer configuração é necessário clonar este repositório em sua máquina local

```
git clone https://github.com/weynelucas/meetapp.git
```


## Backend
Para que o backend do Meetapp funcione devidamente, será necessário:

- Um banco de dados [PostgreSQL](https://www.postgresql.org) (seja ele uma instância local, remota ou dentro de um container Docker)
- Um sevidor SMTP (AWS, GoDaddy, Mailtrap, etc.)

### Instalando dependências
Dentro do repositório, vá para o diretório `backend/` e instale as dependências do projeto

```bash
yarn
```

### Variáveis de ambiente
Com as dependências instaladas, será necessário criar um arquivo `.env` na raiz do diretório `backend/` e preencher as variáveis de ambiente para configurar a aplicação. 

Alternativamente, você pode copiar o conteúdo existente no arquivo `.env.example` e preencher segundo os itens da sua configuração (banco de dados e servidor SMTP)

#### Exemplo
```
# General
NODE_PORT=3333
NODE_ENV=development
APP_URL=http://localhost:3333

# Auth
SECRET_KEY=secret

# Database
DB_NAME=meetapp
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres

# Mail
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=dcb45f0aa6f2e4
MAIL_PASS=f7f87d339c3efc

# Sentry
SENTRY_DSN=https://fba8d497f9624f0c99012ec6187cc9df@sentry.io/1794182
```

### Migrations
Com o banco de dados configurado e as dependências devidamente instaladas rode as migrations com o seguinte comando:

```bash
yarn sequelize db:migrate
```

Ao término do comando, todas as tabelas que serão utilizadas pela aplicação serão automaticamente criadas

### Seeder (opcional)

Caso deseje que a aplicação suba já com um volume de dados significativo para testes, execute as seeders configuradas para o projeto com o comando

```
yarn sequelize db:seed:all --debug
```

A execução do comando irá gerar:

- Uma lista de usuários pré-definidos (todos com a senha `foobar`)
- Um arquivo que será usado como banner de todos os meetups que serão criados
- Para cada usuário, uma lista de meetups aleatórios que ocorrerão em diversos dias (partindo da data no qual o comando será executado) e horários

### Rodando o servidor de desenvolvimento
Para rodar o servidor de desenvolvimento, batsa rodar o script `dev` configurado

```bash
yarn dev
```

## Frontend

## Mobile
