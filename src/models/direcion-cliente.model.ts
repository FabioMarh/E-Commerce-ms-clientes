import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_direcion_id_cliente: {
        name: 'fk_direcion_id_cliente',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'id_cliente',
      },
    },
  },
})
export class DirecionCliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nomenclatura: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'number',
  })
  id_cliente?: number;

  constructor(data?: Partial<DirecionCliente>) {
    super(data);
  }
}

export interface DirecionClienteRelations {
  // describe navigational properties here
}

export type DirecionClienteWithRelations = DirecionCliente &
  DirecionClienteRelations;
