import { observable, action, makeObservable } from 'mobx'
import axios from 'axios'

export type Record = {
  id?: number
  type: string
  date: string
  original_img: string[]
  result_img: string[]
}

class RecordStore {
  @observable recordList: Record[] = []
  @observable currentRecord: Record = null
  @observable recordCache: { hasDetail: boolean } & Record[] = []

  constructor() {
    makeObservable(this)
  }

  // GET all records
  @action async getRecords(first: number, last: number): Promise<Record[]> {
    const resp = await axios.get(`/records/?pagination[start]=${first - 1}&pagination[limit]=${last}`)
    const raw = resp.data.data
    console.log('raw: ' + JSON.stringify(raw))
    const records: Record[] = []

    raw.forEach((record: Record) => {
      records.push({
        id: record.id,
        type: record.type,
        date: record.date,
        original_img: record.original_img,
        result_img: record.result_img
      })
    })
    this.recordList = records
    // console.log('from store test:' + JSON.stringify(records))
    // 没有两个图像数组
    console.log('from store test:' + JSON.stringify(this.recordList))

    const cacheIDs = this.getCachedRecordIDs()
    records.forEach(record => {
      if (cacheIDs.includes(record.id)) {
        return
      } else {
        const newRecord = {
          ...record,
          hasDetail: false
        }
        this.recordCache.push(newRecord)
      }
    })
    console.log('RECORDS:', JSON.stringify(this.recordList))
    return records
  }

  getCachedRecordIDs(): number[] {
    // implementation
    return []
  }

  // GET one record by id
  @action async getRecord(id: number): Promise<Record | undefined> {
    const resp = await axios.get(`/records/${id}`)
    const data = resp.data
    if (!data) {
      return undefined
    }
    const record: Record = {
      id: data.id,
      type: data.type,
      date: data.date,
      original_img: data.original_img,
      result_img: data.result_img
    }
    this.currentRecord = record
    return record
  }

  // POST
  @action async createRecord(record: Omit<Record, 'id' | 'date'>): Promise<Record> {
    const date = new Date()
    const createdRecord = {
      ...record,
      id: undefined,
      date: date.toISOString()
    }
    const resp = await axios.post('/records', createdRecord)
    const { data } = resp

    return data
  }

  // DELETE
  @action async deleteRecord(id: number): Promise<void> {
    await axios.delete(`/records/${id}`)
    this.recordList = this.recordList.filter(record => record.id !== id)
    // this.recordCache = this.recordCache.filter(record => record.id !== id)
  }
}

export default new RecordStore()
