import { expect } from 'chai'
import { spy } from 'sinon'
import { BufferedWriter } from './BufferedWriter'

describe('FileAdapter', () => {
  it('Write buffer', async () => {
    const writer = spy()
    const adapter = new BufferedWriter(writer)

    await Promise.all(
      [...Array(100).keys()].map((index) => adapter.write(`Number #${index}`))
    )

    expect(writer.callCount).to.equal(2)
  })
})
