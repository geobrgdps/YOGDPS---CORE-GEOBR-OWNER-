# YOGDPS — Your Own Geometry Dash Private Server

> Build. Customize. Rule Your GDPS.

YOGDPS é uma plataforma modular para criação e gerenciamento de Geometry Dash Private Servers (GDPS), com foco em organização, experiência do usuário, escalabilidade e administração centralizada.

## Core

A primeira etapa do projeto estabelece a fundação da plataforma:

- Interface Mobile First.
- Tema escuro com roxo como cor principal.
- Estrutura modular de componentes.
- Navegação reutilizável.
- Carregamento de componentes sem framework.
- Base preparada para autenticação, dashboard, Builder e backend.

## Estrutura atual

```text
src/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── components/
    └── Navbar.html
```

## Arquitetura planejada

O frontend será separado dos serviços de backend. O Supabase será utilizado posteriormente como infraestrutura de dados, autenticação, storage e funções server-side quando cada módulo estiver definido.

A compatibilidade com o Geometry Dash será implementada através de uma camada de API própria do YOGDPS, em vez de acoplar a interface diretamente ao banco de dados.

## Princípios

1. Modularidade.
2. Mobile First.
3. Segurança por padrão.
4. Separação de responsabilidades.
5. Escalabilidade.
6. Código simples de manter.
7. Nenhuma funcionalidade deve depender de uma única página monolítica.

## Status

**Core — em desenvolvimento.**

O próximo avanço só deve acontecer após a validação completa da fundação visual e estrutural.
