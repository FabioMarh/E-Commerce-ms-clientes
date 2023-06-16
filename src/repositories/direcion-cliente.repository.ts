import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DirecionCliente, DirecionClienteRelations} from '../models';

export class DirecionClienteRepository extends DefaultCrudRepository<
  DirecionCliente,
  typeof DirecionCliente.prototype.id,
  DirecionClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DirecionCliente, dataSource);
  }
}
