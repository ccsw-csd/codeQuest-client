import { LevelMap } from "../model/LevelMap";

export const LEVEL_DATA : LevelMap = {
    name: 'Level 1',
    chapterInfo: `
    <div class="p-2 text-lg font-italic text-justify">
        Atraviesas la entrada del castillo, con cierto nerviosismo, y llegas a un largo pasillo con unas escaleras al fondo. Cerca de esas escaleras, puedes ver una espada vieja y oxidada que podría serte de utilidad, si las cosas se torcieran más adelante.<br/>Decides coger la espada antes de subir las escaleras.
    </div>
    <div class="info-tip">
        <b>TIP</b>: Intenta avanzar hacia delante dentro del método <span class="info-tag">play()</span> de la clase <span class="info-tag">Player</span>.
    </div>
    <h2 class="mt-4">Habilidades</h2>
    <div class="mt-2">
        <h3>Acciones (solo una por turno)</h3>
        <div>
            <div><span class="info-tag">warrior.walk(direction?)</span></div>
            <div class="ml-3 mt-2">
                Avanza una posición en el mapa. La dirección de avance (<span class="info-tag">'right'</span><span> o </span><span class="info-tag">'left'</span><span>) es opcional y por defecto será </span><span class="info-tag">'right'</span>.
            </div>
        </div>
    </div>
    <div class="mt-6">
        <h3>Sentidos</h3>
        <div>
            <div><span class="info-tag">warrior.think(message)</span></div>
            <div class="ml-3 mt-2">
                Piensa en voz alta (similar a un <span class="info-tag">console.log</span>). La propiedad <span class="info-tag">message</span> es el texto que se mostrará en consola.
            </div>
        </div>
    </div>
    `,
    quest: {
      id: 1,
      name: 'El Castillo de Typescript'
    },
    tiles : [
      ['wall-tl', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-tr'],
      [ 'wall-l', 'none', 'player', 'none', 'none', 'none', 'none', 'item-sword', 'none', 'ladder',  'wall-r'],
      ['wall-bl', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-br'],
    ],
    lib: `
      /** Contiene las posibles acciones de un guerrero */
      interface Warrior {
        /** Avanza una posición en el mapa.\n
         * * *direction (optional)* -> La dirección de avance ('right' o 'left'). *Por defecto será 'right'.*
         */
        public walk(direction?: string): void;

        /** Piensa en voz alta (similar a un console.log).\n
         * * *message* -> El texto que piensa el guerrero.
        */
        public think(message: string): void;        
      }

      interface Play {
        public play(warrior: Warrior) : void;
      }
    `,
    originalCode: `/**
 *
 * Comportamiento del jugador
 * 
 */
class Player implements Play {
    
    
  public play(warrior : Warrior) : void {

    //TODO Implementa logica del jugador
    warrior.

  }
    
}`
  }
