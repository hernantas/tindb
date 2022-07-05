import { expect } from 'chai'
import { rm } from 'fs/promises'
import { file } from 'tempy'
import { TextAdapter } from './TextAdapter'

describe('TextAdapter', () => {
  it('Read empty file', async () => {
    const filepath = file()
    const adapter = new TextAdapter(filepath)
    await expect(adapter.read()).to.be.fulfilled.and.to.eventually.equal('')
  })

  it('Write & Read file', async () => {
    const filepath = file()
    const adapter = new TextAdapter(filepath)
    await expect(adapter.write('Test')).to.be.fulfilled
    await expect(adapter.read()).to.be.fulfilled.and.to.eventually.equal('Test')
    await rm(filepath)
  })
})
