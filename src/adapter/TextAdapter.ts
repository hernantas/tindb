import { readFile, writeFile } from 'fs/promises'
import { Adapter } from './Adapter.js'
import { ReadFn } from './ReadFn.js'
import { WriteFn } from './WriteFn.js'

export class TextAdapter implements Adapter<string> {
  constructor(
    filepath: string,
    private readonly readFn: ReadFn<string> = () => readFile(filepath, 'utf-8'),
    private readonly writeFn: WriteFn<string> = (data) =>
      writeFile(filepath, data, 'utf-8')
  ) {}

  async read(): Promise<string> {
    return await this.readFn()
  }

  async write(data: string): Promise<void> {
    await this.writeFn(data)
  }
}
