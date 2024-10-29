
export const tests = [
    {
        title: 'Check initial state',
        test: (taskContentRoot: HTMLElement) => {
            return new Promise((resolve) => {
                console.log(taskContentRoot.outerHTML);
                const result = taskContentRoot.outerHTML === `<div><ul><li><span>Oranges</span> - <span>votes: 0</span><button>+</button> <button>-</button></li><li><span>Bananas</span> - <span>votes: 0</span><button>+</button> <button>-</button></li></ul></div>`;
                resolve(result);
            });
        }
    },
    {
        title: 'Clicking plus button increases the vote',
        test: (taskContentRoot: HTMLElement) => {
            return new Promise((resolve) => {
                const plusButton = taskContentRoot.querySelector('ul > li > button') as HTMLButtonElement;
                console.log('----------- clicking plus button');
                if (plusButton) {
                    plusButton.click();
                }
                setTimeout(() => {
                    console.log('setting html elemetn', taskContentRoot.outerHTML);
                    const result = taskContentRoot.outerHTML === `<div><ul><li><span>Oranges</span> - <span>votes: 1</span><button>+</button> <button>-</button></li><li><span>Bananas</span> - <span>votes: 0</span><button>+</button> <button>-</button></li></ul></div>`;
                    resolve(result);
                }, 400);
            });
        }
    }
];
