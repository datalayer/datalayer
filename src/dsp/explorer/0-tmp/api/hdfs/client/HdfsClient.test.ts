import { HdfsClientFactory } from './HdfsClientFactory'
import { IHdfsClient } from './HdfsClient'
// import * as sb from 'stream-buffers'

describe('WebHdfs Integration', () => {

  it('throws 404 error when not found.', async () => {
    const path = 'integration/DoesNotExist.txt';
    const client: IHdfsClient = HdfsClientFactory.create({
      url: 'http://localhost:50070',
      path: 'webhdfs/v1/testing/'
    })
    let result = await client.getFileStatus(path)
    expect(result.success).toEqual(false)
  })
/*
  it('can create a directory', async () => {
    const client: IHdfsClient = HdfsClientFactory.create({
      url: 'http://localhost:50070',
      path: 'webhdfs/v1/testing/',
      username: 'datalayer'
    })
    const path = 'integration/'
    let outcome = await client.makeDirectory(path)
    expect(outcome.success).to.be.equal(true)
  })
*/
/*
  it('can list status', async () => {
    const client: IHdfsClient = HdfsClientFactory.create({
      url: 'http://localhost:50070',
      path: 'webhdfs/v1/testing/',
      username: 'datalayer'
    })
    let outcome = await client.listStatus("/")
    expect(outcome.success).to.be.equal(true)
  })
*/
/*
  it('can roundtrip a file.', async (done) => {
    const hdfsPath = 'integration/roundtrip.txt';
    const client: IHdfsClient = HdfsClientFactory.create({
      url: 'http://localhost:50070',
      path: 'webhdfs/v1/testing/',
      username: 'datalayer'
    })
    const expected: string = 'this is my test string that I am round-tripping.\n have a good trip!';
    let inputStream = new sb.ReadableStreamBuffer();
    inputStream.put(expected);
    inputStream.stop();
    let outcome = await client.createFile(inputStream, hdfsPath, { overwrite: true });
    expect(outcome.success).to.be.equal(true);
    let outStream = new sb.WritableStreamBuffer();
    client.OpenFile(hdfsPath)
      .on('complete', assert)
      .pipe(outStream);
    function assert(): void {
      outStream.end();
      let actual = outStream.getContentsAsString();
      expect(actual).toEqual(expected);
      done()
    }
 })
*/
})
