# YOGDPS API

A API pública do YOGDPS fica separada da interface. O gateway atual é uma fundação sem banco conectado.

## Rotas

- `?action=health` — status do serviço.
- `?action=config` — metadados públicos da plataforma.
- `?action=projects` — contrato inicial de projetos.
- `?action=levels` — contrato inicial de níveis.

## Próxima integração

O Supabase será conectado por uma camada de serviço própria. Nenhuma chave privada deve ser colocada neste diretório ou no frontend.
