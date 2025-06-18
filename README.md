# ⚙️ Projeto de Idempotência em TypeScript

Este repositório apresenta uma implementação prática e didática de **idempotência em operações de API**, utilizando **TypeScript + Express**. O objetivo é demonstrar como construir sistemas **robustos e resilientes**, capazes de lidar com **falhas de rede** e **retentativas de forma segura**.

📚 **Base teórica:**


---

## 🧠 O que é Idempotência?

> A **idempotência** é a propriedade de certas operações que permite que sejam executadas múltiplas vezes com o **mesmo efeito da primeira execução bem-sucedida**.

📐 **Em termos matemáticos:**
```ts
f(f(x)) = f(x)
```
🎯 No desenvolvimento de software, a idempotência garante que requisições repetidas não causem efeitos colaterais indesejados, como cobranças ou cadastros duplicados.

---
### 🚀 Por que a Idempotência é Importante?
* ✅ **Redes instáveis:** Falhas de conexão e timeouts são comuns. [cite_start]A idempotência protege contra ações repetidas e seus efeitos indesejados.
* ✅ **Sistemas distribuídos:** Em arquiteturas com microsserviços, a retentativa é padrão. [cite_start]A idempotência ajuda a manter a integridade e simplifica o tratamento de erros.
* ✅ **Mensageria (ex: RabbitMQ, Kafka):** Em modelos de entrega *at-least-once*, o mesmo evento pode ser consumido mais de uma vez. [cite_start]A idempotência no processador da mensagem é vital para que a lógica de negócio seja executada apenas uma vez.
* ✅ **Simplicidade no cliente:** O frontend (ou outro serviço) pode apenas reenviar a requisição com segurança, sem precisar de lógicas complexas para verificar o estado da operação anterior.

---
### 🌐 Idempotência em APIs RESTful

| Método HTTP | É idempotente? | Descrição |
| :--- | :--- | :--- |
| **GET** | ✅ Sim | [cite_start]Recupera dados sem alterar o estado do servidor. |
| **PUT** | ✅ Sim | [cite_start]Substitui o recurso — repetir a requisição mantém o mesmo resultado final. |
| **DELETE** | ✅ Sim | [cite_start]Apaga o recurso — deletar várias vezes causa o mesmo estado: ausente. |
| **POST** | ❌ Não | [cite_start]Cria um novo recurso — repetir geralmente gera duplicidade. |
| **PATCH** | ⚠️ Depende | [cite_start]Alterações parciais (relativas) podem não ser idempotentes. |

---
### 🛡️ Como Tornar POST Idempotente?
A técnica mais comum é usar um cabeçalho personalizado: `Idempotency-Key`.

#### 🔁 Fluxo de Funcionamento:
1.  🧑‍💻 Cliente gera uma UUID e envia no cabeçalho `Idempotency-Key`.
2.  🧠 Servidor verifica se essa chave já foi usada.
3.  🔄 **Se sim,** retorna a mesma resposta da primeira requisição, sem executar a lógica novamente.
4.  ✨ **Se não,** executa a lógica e armazena o resultado associado à chave.
5.  ⏱️ Define-se um TTL (tempo de vida) para essa chave (ex: 24h) para que ela expire e não ocupe espaço indefinidamente.

---
### 📁 Como Usar este Projeto
**Clone o repositório:**
```bash
git clone https://github.com/Thigovenc/IdempotenciaApresentacao.git
cd IdempotenciaApresentacao
```

**Instale as dependências:**
```bash
npm install
```
### 🧪 Teste a Idempotência com cURL
O `Idempotency-Key` é enviado no cabeçalho da requisição para garantir que a operação seja processada apenas uma vez.

```bash
curl --location 'http://localhost:3000/pedidos' \
--header 'Content-Type: application/json' \
--header 'Idempotency-Key: a1b2c3d4-e5f6-7890-1234-567890abcdef' \
--data '{
  "produto": "Notebook",
  "quantidade": 1
}'
```
### 🧑‍💻 Autor
**Thiago Venceslau**

[GitHub](https://github.com/Thigovenc) | [LinkedIn](https://www.linkedin.com/in/thiago-venceslau-8010061b5/)
