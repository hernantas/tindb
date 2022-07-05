import { expect } from 'chai'
import { LocalStorageAdapter } from './LocalStorageAdapter'

class MockStorage implements Storage {
  private storage: { [key: string]: string } = {}

  get length(): number {
    throw new Error('Method not implemented.')
  }
  clear(): void {
    throw new Error('Method not implemented.')
  }
  key(_index: number): string | null {
    throw new Error('Method not implemented.')
  }
  removeItem(_key: string): void {
    throw new Error('Method not implemented.')
  }

  getItem(key: string): string | null {
    return this.storage[key] ?? null
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value
  }
}

global.localStorage = new MockStorage()

describe('LocalStorageAdapter', async () => {
  const adapter = new LocalStorageAdapter()

  it('Read empty', async () => {
    await expect(adapter.read()).to.be.fulfilled.and.to.eventually.equal(
      undefined
    )
  })

  it('Write & Read', async () => {
    const data = { hello: 'world' }
    await expect(adapter.write(data)).to.be.fulfilled
    await expect(adapter.read()).to.be.fulfilled.and.to.eventually.deep.equal(
      data
    )
  })
})
