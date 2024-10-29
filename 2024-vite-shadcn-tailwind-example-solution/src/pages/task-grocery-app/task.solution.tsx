import React from 'react';

export default function Task() {
    return <GroceryApp
        products={[
            { name: "Oranges", votes: 0 },
            { name: "Bananas", votes: 0 }
        ]}
    />;
}

const Product = props => {
    const plus = () => {
      props.onVote(1, props.index);
    };
    const minus = () => {
      props.onVote(-1, props.index);
    };
    return (
      <li>
        <span>{props.product.name}</span> - <span>votes: {props.product.votes}</span>
        <button onClick={plus}>+</button>{" "}
        <button onClick={minus}>-</button>
      </li>
    );
  };

  const GroceryApp = (props) => {
    let [products, setProducts] = React.useState(props.products);

    const onVote = (dir, index) => {
      const newProducts = [...products];
      newProducts[index].votes += dir;
      setProducts(newProducts);
    };

    return (
      <ul>
        {products.map((product, index) => (
          <Product key={index} index={index} product={product} onVote={onVote} />
        ))}
      </ul>
    );
  }


export const taskTests = [
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
                plusButton.click();
                setTimeout(() => {
                    console.log('setting html elemetn', taskContentRoot.outerHTML);
                    const result = taskContentRoot.outerHTML === `<div><ul><li><span>Oranges</span> - <span>votes: 1</span><button>+</button> <button>-</button></li><li><span>Bananas</span> - <span>votes: 0</span><button>+</button> <button>-</button></li></ul></div>`;
                    resolve(result);
                }, 1000);
            });
        }
    }
];