type TaskQueueTask = {
  task: () => Promise<void>
  cancel: () => void
}

export class TaskQueue {
  private tasks: TaskQueueTask[]
  private isRunning: boolean
  private waitForCurrentTask: Promise<void> | null

  constructor() {
    this.tasks = []
    this.isRunning = false
    this.waitForCurrentTask = null
  }

  async enqueue<T>(task: () => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      this.tasks.push({
        task: async () => {
          try {
            resolve(await task())
          } catch (err) {
            reject(err)
          }
        },
        cancel: () => {
          reject(new Error("Task was cancelled"))
        },
      })
      if (!this.isRunning) {
        this.isRunning = true
        this.tick()
      }
    })
  }

  async clear() {
    const tasks = this.tasks
    this.tasks = []

    for (const task of tasks) {
      task.cancel()
    }
    if (this.waitForCurrentTask !== null) {
      await this.waitForCurrentTask
    }
  }

  private async tick() {
    const task = this.tasks.shift()
    if (task !== undefined) {
      this.waitForCurrentTask = task.task().then(() => {
        this.waitForCurrentTask = null
        this.tick()
      })
    } else {
      this.isRunning = false
    }
  }
}
