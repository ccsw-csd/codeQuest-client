export class RunResult {
    status: number;
    turns: TurnRunResult[];
}


export class TurnRunResult {
    events: EventRunResult[];

    health: number;
    map: number[][];
}

export class EventRunResult {
    data: any;
    message: string;
    type: number;
}


export class EventPlayResult {
    data: any;
    message: string;
    type: number;
    health: number;
    map: number[][];
    turn: number;
}