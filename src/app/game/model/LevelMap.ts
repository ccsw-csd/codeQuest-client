import { Quest } from "./Quest";

export class LevelMap {

    levelId: number;
    name: string;
    quest: Quest;
    map : number[][];
    lib: string;
    originalCode: string;
    
    chapterInfo: string;


    constructor() {
        this.quest = new Quest();
    }
}