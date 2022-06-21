import { Adapter } from './Adapter'
import { TextAdapter } from './TextAdapter'

export class JSONAdapter implements Adapter<unknown> {
  constructor(
    filepath: string,
    private readonly adapter: TextAdapter = new TextAdapter(filepath)
  ) {}

  async read(): Promise<unknown> {
    return JSON.parse(await this.adapter.read())
  }

  async write(data: unknown): Promise<void> {
    await this.adapter.write(JSON.stringify(data))
  }
}
