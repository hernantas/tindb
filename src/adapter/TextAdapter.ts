import { readFile, writeFile } from 'fs/promises'
import { Adapter } from './Adapter'
import { BufferedWriter } from './BufferedWriter'

export class TextAdapter implements Adapter<string> {
  private readonly writer: BufferedWriter<string>

  constructor(private readonly filepath: string) {
    this.writer = new BufferedWriter((data) =>
      writeFile(filepath, data, 'utf-8')
    )
  }

  async read(): Promise<string> {
    return await readFile(this.filepath, 'utf-8')
  }

  async write(data: string): Promise<void> {
    await this.writer.write(data)
  }
}
