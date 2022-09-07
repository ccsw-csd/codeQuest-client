import { Quest } from "./Quest";

export class LevelMap {

    levelId: number;
    name: string;
    quest: Quest;
    tiles : string[][];
    lib: string;
    originalCode: string;
    
    chapterInfo: string;


    constructor() {
        this.quest = new Quest();
    }
}