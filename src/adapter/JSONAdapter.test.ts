import { expect } from 'chai'
import { spy } from 'sinon'
import { JSONAdapter } from './JSONAdapter'

describe('JSONAdapter', () => {
  const strData = '{ "foo": "bar" }'
  const readFn = spy(() => strData)
  const writeFn = spy()
  const adapter = new JSONAdapter('', {
    async read() {
      return await readFn()
    },

    async write(data: string) {
      await writeFn(data)
    },
  })

  it('Read', () => {
    expect(adapter.read()).to.eventually.deep.equal({ foo: 'bar' })
    expect(readFn.callCount).to.equal(1)
  })

  it('Write', async () => {
    expect(adapter.write(strData)).to.eventually.not.throw()
    expect(writeFn.callCount).to.equal(1)
  })
})
