import dateFormat from 'date-format';

class LogTask {
  constructor(readonly name: string) {}

  logStep(emoji:string, step: string, description: string) {
    console.log(`[${dateFormat(new Date(), "dd-mm-yyyy H:MM:ss")}] - ${emoji} ${this.name} ${step} ${description}`)
  }
}

export { LogTask };
