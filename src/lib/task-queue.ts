type TaskQueueTask = {
  task: (abortController: AbortController) => Promise<void>
  cancel: () => void
}

export class TaskQueue {
  private tasks: TaskQueueTask[]
  private isRunning: boolean
  private waitForCurrentTask: Promise<void> | null
  private abortController: AbortController

  constructor() {
    this.tasks = []
    this.isRunning = false
    this.waitForCurrentTask = null
    this.abortController = new AbortController()
  }

  async enqueue<T>(task: (abortController: AbortController) => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      this.tasks.push({
        task: async (abortController) => {
          try {
            resolve(await task(abortController))
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
    this.abortController.abort()
    this.abortController = new AbortController()
    if (this.waitForCurrentTask !== null) {
      await this.waitForCurrentTask
    }
  }

  private async tick() {
    const task = this.tasks.shift()
    if (task) {
      this.waitForCurrentTask = task.task(this.abortController).then(() => {
        this.waitForCurrentTask = null
        this.tick()
      })
    } else {
      this.isRunning = false
    }
  }
}
