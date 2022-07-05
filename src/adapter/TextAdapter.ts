import { readFile, writeFile } from 'fs/promises'
import { BufferedWriter } from '../helper/BufferedWriter'
import { Adapter } from './Adapter'

export class TextAdapter implements Adapter<string> {
  private readonly writer: BufferedWriter<string>

  constructor(private readonly filepath: string) {
    this.writer = new BufferedWriter((data) =>
      writeFile(filepath, data, 'utf-8')
    )
  }

  async read(): Promise<string> {
    try {
      return await readFile(this.filepath, 'utf-8')
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        return ''
      }
      throw e
    }
  }

  async write(data: string): Promise<void> {
    await this.writer.write(data)
  }
}
