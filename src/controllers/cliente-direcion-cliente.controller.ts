import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  DirecionCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDirecionClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/direcion-cliente', {
    responses: {
      '200': {
        description: 'Cliente has one DirecionCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DirecionCliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DirecionCliente>,
  ): Promise<DirecionCliente> {
    return this.clienteRepository.direcionCliente(id).get(filter);
  }

  @post('/clientes/{id}/direcion-cliente', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(DirecionCliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirecionCliente, {
            title: 'NewDirecionClienteInCliente',
            exclude: ['id'],
            optional: ['id_cliente']
          }),
        },
      },
    }) direcionCliente: Omit<DirecionCliente, 'id'>,
  ): Promise<DirecionCliente> {
    return this.clienteRepository.direcionCliente(id).create(direcionCliente);
  }

  @patch('/clientes/{id}/direcion-cliente', {
    responses: {
      '200': {
        description: 'Cliente.DirecionCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DirecionCliente, {partial: true}),
        },
      },
    })
    direcionCliente: Partial<DirecionCliente>,
    @param.query.object('where', getWhereSchemaFor(DirecionCliente)) where?: Where<DirecionCliente>,
  ): Promise<Count> {
    return this.clienteRepository.direcionCliente(id).patch(direcionCliente, where);
  }

  @del('/clientes/{id}/direcion-cliente', {
    responses: {
      '200': {
        description: 'Cliente.DirecionCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DirecionCliente)) where?: Where<DirecionCliente>,
  ): Promise<Count> {
    return this.clienteRepository.direcionCliente(id).delete(where);
  }
}
