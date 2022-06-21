import { Adapter } from './Adapter'
import { TextAdapter } from './TextAdapter.js'

export class JSONAdapter implements Adapter<unknown> {
  private readonly adapter: TextAdapter

  constructor(filepath: string) {
    this.adapter = new TextAdapter(filepath)
  }

  async read(): Promise<unknown> {
    const data = await this.adapter.read()
    return data !== undefined && data !== null ? JSON.parse(data) : undefined
  }

  async write(data: unknown): Promise<void> {
    await this.adapter.write(JSON.stringify(data))
  }
}
