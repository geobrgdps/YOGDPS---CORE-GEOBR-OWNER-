# YOGDPS — Your Own Geometry Dash Private Server

> **Build. Customize. Rule Your GDPS.**

YOGDPS é uma plataforma para criar, personalizar e administrar Geometry Dash Private Servers com uma experiência moderna e arquitetura preparada para escala.

## O que já existe no Core

- Landing page responsiva.
- Sistema visual global roxo/escuro.
- Navbar modular.
- Autenticação local de demonstração.
- Dashboard.
- Gerenciamento de projetos.
- GDPS Builder.
- Configurações.
- Console administrativo.
- Documentação.
- Gateway inicial de API.
- Estrutura pronta para conexão com Supabase.

## Estrutura

```text
src/
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── components/
│   └── Navbar.html
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── projects/
│   ├── builder/
│   ├── docs/
│   ├── settings/
│   └── admin/
└── api/
    ├── index.php
    └── README.md
```

## Arquitetura

```text
YOGDPS Web
    ↓
Interface modular
    ↓
YOGDPS API Gateway
    ↓
Data / Auth Layer
    ↓
Supabase (próxima integração)
    ↓
Dados e serviços do GDPS
```

A interface **não acessa o banco diretamente**. A camada de API é o ponto de entrada para operações de backend, permitindo trocar ou evoluir a infraestrutura sem reescrever o frontend.

## Supabase

O Core **não contém credenciais ou configurações específicas do projeto Supabase**. A integração será feita depois, no projeto Supabase correto, com:

- PostgreSQL.
- Auth.
- Storage.
- RLS.
- Edge Functions quando necessário.
- Camada de serviços do YOGDPS.

## Segurança

Nunca coloque service-role keys, senhas ou tokens privados no frontend ou neste repositório público. O acesso a dados deverá ser protegido por autenticação, autorização por projeto, validação e RLS.

## Desenvolvimento

O projeto foi construído sem framework obrigatório para manter o Core leve e fácil de administrar pelo celular. Cada módulo possui seus próprios arquivos quando necessário.

## Status

**Core frontend + arquitetura inicial: implementados.**

**Backend persistente/Supabase: aguardando configuração do projeto Supabase.**
