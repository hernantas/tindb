import { Adapter } from './adapter/Adapter'

export class Tin {
  constructor(private readonly adapter: Adapter<unknown>) {}

  async read(): Promise<unknown | undefined> {
    return await this.adapter.read()
  }

  async write(data: unknown): Promise<void> {
    await this.adapter.write(data)
  }
}
