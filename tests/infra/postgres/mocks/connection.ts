import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { Connection, EntityTarget } from 'typeorm'

export type FakeDb = {
  connection: Connection
  backup: IBackup
}

export const makeFakeDb = async (entities: Array<EntityTarget<any>>): Promise<FakeDb> => {
  const db: IMemoryDb = newDb()
  const connection: Connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities
  })
  await connection.synchronize()
  const backup: IBackup = db.backup()
  return { connection, backup }
}
