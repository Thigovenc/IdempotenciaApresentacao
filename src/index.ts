import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

type Pedido = {
  id: string;
  produto: string;
  quantidade: number;
};

const pedidos: Pedido[] = [];
const idempotencyKeys = new Map<string, Pedido>();


app.post('/pedidos', (req: Request, res: Response) => {
    const idempotencyKey = req.header('Idempotency-Key');

    if (!idempotencyKey) {
      return res.status(400).json({ error: 'Idempotency-Key header is required' });
    }

    if (idempotencyKeys.has(idempotencyKey)) {
      return res.status(200).json({
        message: 'Requisição idempotente. Pedido já criado.',
        pedido: idempotencyKeys.get(idempotencyKey),
      });
    }

    const novoPedido: Pedido = {
      id: Math.random().toString(36).substring(2, 10),
      produto: req.body.produto,
      quantidade: req.body.quantidade,
    };

    pedidos.push(novoPedido);
    idempotencyKeys.set(idempotencyKey, novoPedido);

    return res.status(201).json({ message: 'Pedido criado com sucesso', pedido: novoPedido });
  }
);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
