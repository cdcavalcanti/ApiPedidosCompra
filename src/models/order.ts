export type UUID = string

export enum OrderStatus {
  EM_ANALISE = "EM_ANALISE",
  APROVADO = "APROVADO",
  CANCELADO = "CANCELADO",
}

export interface OrderItem {
  produto: string
  quantidade: number
  valorUnitario: number
  subtotal: number
}

export interface Order {
  id: UUID
  cliente: string
  dataPedido: string 
  status: OrderStatus
  itens: OrderItem[]
  total: number
  updatedAt: string
  createdAt: string
}
