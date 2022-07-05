import { expect } from 'chai'
import { file } from 'tempy'
import { JSONAdapter } from './JSONAdapter'

describe('JSONAdapter', () => {
  it('Read empty file', async () => {
    const filepath = file()
    const adapter = new JSONAdapter(filepath)
    await expect(adapter.read()).to.be.fulfilled.and.to.eventually.equal(
      undefined
    )
  })

  it('Write & read file', async () => {
    const data = { hello: 'world' }
    const filepath = file()
    const adapter = new JSONAdapter(filepath)
    await expect(adapter.write(data)).to.be.fulfilled
    await expect(adapter.read()).to.be.fulfilled.and.to.eventually.deep.equal(
      data
    )
  })
})
