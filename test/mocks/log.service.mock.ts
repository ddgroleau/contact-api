import { BaseLogger } from "../../src/logging/base.logger";

export class MockLogger extends BaseLogger {
    constructor() {
        super();
    }

    public override error(message: string, exception?: string, stackTrace?: string): void {
        console.log(message);
    }
}