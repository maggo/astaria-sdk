export class Queue {
  private _isRunning: boolean
  public get isRunning(): boolean {
    return this._isRunning
  }
  private callBack: () => void
  private stack: Map<string, () => Promise<void>>

  constructor(_callBack: () => void) {
    this._isRunning = false
    this.callBack = _callBack
    this.stack = new Map<string, () => Promise<void>>()
  }

  public push(taskId: string, task: () => Promise<void>) {
    if (this.stack.get(taskId)) {
      return
    }
    this.stack.set(taskId, task)

    if (!this.isRunning) this.run()
  }

  private async run() {
    this._isRunning = true
    const keys = Array.from(this.stack.keys())
    const values = Array.from(this.stack.values())

    const promises = values.map((promise: () => Promise<void>) => promise())
    await Promise.all(promises).then(() => {
      keys.forEach((key) => {
        this.stack.delete(key)
      })
      if (this.stack.size > 0) this.run()
      else {
        this._isRunning = false
        this.callBack()
      }
    })
  }
}
