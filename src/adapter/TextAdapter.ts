import { readFile, writeFile } from 'fs/promises'
import { Adapter } from './Adapter.js'

export class TextAdapter implements Adapter<string> {
  constructor(private readonly filepath: string) {}

  async read(): Promise<string | undefined> {
    return await readFile(this.filepath, 'utf-8')
  }

  async write(data: string): Promise<void> {
    await writeFile(this.filepath, data, 'utf-8')
  }
}
