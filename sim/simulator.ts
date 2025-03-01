/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    export interface ISimMessage {
        type: "simulator.message";
        key?: string;
        data?: string;
    }

    const postContainerMessage = (message: pxsim.ISimMessage) => {
        Runtime.postMessage({
            type: "custom",
            __proxy: "parent",
            content: message
        } as pxsim.SimulatorCustomMessage);
    };

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public element : SVGSVGElement;
        public spriteElement: SVGCircleElement;
        public hareElement: SVGCircleElement;
        public sprite : Sprite;
        public hare: Sprite;
        
        constructor() {
            super();
            this.element = <SVGSVGElement><any>document.getElementById('svgcanvas');
            this.spriteElement = <SVGCircleElement>this.element.getElementById('svgsprite');
            this.hareElement = <SVGCircleElement>this.element.getElementById('svgsprite2');
            this.sprite = new Sprite()
            this.hare = new Sprite();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.element);

            return Promise.resolve();
        }       
        
        updateView() {
            this.spriteElement.cx.baseVal.value = this.sprite.x;
            this.spriteElement.cy.baseVal.value = this.sprite.y;

            this.hareElement.cx.baseVal.value = this.hare.x;
            this.hareElement.cy.baseVal.value = this.hare.y;
        }

        public receiveMessage(msg: SimulatorMessage) {
            switch (msg.type) {
                case "helloFromAIThaiGen":
                    console.log("Hello from AI Thai Gen");
                    break;
                default:
            }
        }

        public sendMessage(key: string, data: string) {
            postContainerMessage({
                type: "simulator.message",
                key: key,
                data: data
            } as pxsim.ISimMessage);
        }
    }
}