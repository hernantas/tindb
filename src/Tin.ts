import { Adapter } from './adapter/Adapter'

export class Tin<T = unknown> {
  constructor(private readonly adapter: Adapter<T>) {}

  async read(): Promise<T> {
    return await this.adapter.read()
  }

  async write(data: T): Promise<void> {
    await this.adapter.write(data)
  }
}
