import { Adapter } from './Adapter'

export class LocalStorageAdapter implements Adapter<unknown> {
  constructor(private readonly key: string = 'tindb') {}

  async read(): Promise<unknown> {
    const data = global.localStorage.getItem(this.key)

    if (data === null) {
      return undefined
    }

    try {
      return JSON.parse(data)
    } catch (e) {
      return undefined
    }
  }

  async write(data: unknown): Promise<void> {
    global.localStorage.setItem(this.key, JSON.stringify(data))
  }
}
