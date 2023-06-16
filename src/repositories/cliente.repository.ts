import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, DirecionCliente, UsuarioCliente} from '../models';
import {DirecionClienteRepository} from './direcion-cliente.repository';
import {UsuarioClienteRepository} from './usuario-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly direcionCliente: HasOneRepositoryFactory<DirecionCliente, typeof Cliente.prototype.id>;

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DirecionClienteRepository') protected direcionClienteRepositoryGetter: Getter<DirecionClienteRepository>, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
    this.direcionCliente = this.createHasOneRepositoryFactoryFor('direcionCliente', direcionClienteRepositoryGetter);
    this.registerInclusionResolver('direcionCliente', this.direcionCliente.inclusionResolver);
  }
}
