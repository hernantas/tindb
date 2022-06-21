import { readFile, writeFile } from 'fs/promises'
import { Adapter } from './Adapter'
import { BufferedWriter } from './BufferedWriter'
import { ReadFn } from './ReadFn'
import { WriteFn } from './WriteFn'

export class TextAdapter implements Adapter<string> {
  private readonly writer: BufferedWriter<string>

  constructor(
    filepath: string,
    private readonly readFn: ReadFn<string> = () => readFile(filepath, 'utf-8'),
    writeFn: WriteFn<string> = (data) => writeFile(filepath, data, 'utf-8')
  ) {
    this.writer = new BufferedWriter(writeFn)
  }

  async read(): Promise<string> {
    return await this.readFn()
  }

  async write(data: string): Promise<void> {
    await this.writer.write(data)
  }
}
