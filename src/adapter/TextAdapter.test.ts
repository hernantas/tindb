import { expect } from 'chai'
import { spy } from 'sinon'
import { TextAdapter } from './TextAdapter'

describe('TextAdapter', () => {
  const readFn = spy(async () => '')
  const writeFn = spy()
  const adapter = new TextAdapter('', readFn, writeFn)

  it('Read File', async () => {
    expect(await adapter.read()).to.equal('')
    expect(readFn.callCount).to.equal(1)
  })

  it('Write File', async () => {
    await adapter.write('')
    expect(writeFn.callCount).to.equal(1)
  })
})
