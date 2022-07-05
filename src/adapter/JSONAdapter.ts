import { Adapter } from './Adapter'
import { TextAdapter } from './TextAdapter'

export class JSONAdapter implements Adapter<unknown> {
  private readonly adapter: Adapter<string>

  constructor(filepath: string) {
    this.adapter = new TextAdapter(filepath)
  }

  async read(): Promise<unknown> {
    const data = await this.adapter.read()

    try {
      return JSON.parse(data)
    } catch (e) {
      return undefined
    }
  }

  async write(data: unknown): Promise<void> {
    await this.adapter.write(JSON.stringify(data))
  }
}
