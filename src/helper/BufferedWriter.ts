import { WriteFn } from '../alias/WriteFn'

interface Executor<T> {
  resolve(value: T | PromiseLike<T>): void
  reject(reason?: any): void
}

export class BufferedWriter<T> {
  private lock: boolean = false
  private buffer?: T
  private next: Executor<void>[] = []

  constructor(private readonly writeFn: WriteFn<T>) {}

  async write(data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      this.buffer = data
      this.next.push({
        resolve,
        reject,
      })
      this.flush()
    })
  }

  private async flush(): Promise<void> {
    if (this.buffer === undefined || this.lock) {
      return
    }

    const buffer = this.buffer
    const next = this.next

    delete this.buffer
    this.next = []

    this.lock = true
    try {
      await this.writeFn(buffer)
      next.forEach(({ resolve }) => resolve())
    } catch (e) {
      next.forEach(({ reject }) => reject(e))
      throw e
    } finally {
      this.lock = false
    }

    await this.flush()
  }
}
