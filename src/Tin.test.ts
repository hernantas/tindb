import { Adapter } from './adapter/Adapter'
import { Tin } from './Tin'
import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'

use(chaiAsPromised)

function createErrorAdapter(): Adapter {
  return {
    async read(): Promise<unknown | undefined> {
      throw new Error()
    },
    async write(_data: unknown): Promise<void> {
      throw new Error()
    },
  }
}

function createAdapter(returnValue: unknown): Adapter {
  return {
    async read(): Promise<unknown | undefined> {
      return returnValue
    },
    async write(_data: unknown): Promise<void> {},
  }
}

describe('Tin', () => {
  describe('Correct adapter', () => {
    const adapter: Adapter = createAdapter('')
    const instance = new Tin(adapter)
    it('Read file', async () => {
      expect(instance.read()).to.eventually.equal('')
    })
    it('Write file', async () => {
      expect(instance.write('Anything')).to.eventually.not.throw()
    })
  })

  describe('Error adapter', () => {
    const adapter: Adapter = createErrorAdapter()
    const instance = new Tin(adapter)
    it('Read file', async () => {
      expect(instance.read()).to.eventually.throw()
    })
    it('Write file', async () => {
      expect(instance.write('Anything')).to.eventually.throw()
    })
  })

  describe('Null adapter', () => {
    const adapter: Adapter = createAdapter(null)
    const instance = new Tin(adapter)
    it('Read file', async () => {
      expect(instance.read()).to.eventually.equal(null)
    })
    it('Write file', async () => {
      expect(instance.write('Anything')).to.eventually.not.throw()
    })
  })

  describe('Undefined adapter', () => {
    const adapter: Adapter = createAdapter(undefined)
    const instance = new Tin(adapter)
    it('Read file', async () => {
      expect(instance.read()).to.eventually.equal(undefined)
    })
    it('Write file', async () => {
      expect(instance.write('Anything')).to.eventually.not.throw()
    })
  })
})
