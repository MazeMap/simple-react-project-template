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
      // Call props.onVote to increase the vote count for this product
    };
    const minus = () => {
      // Call props.onVote to decrease the vote count for this product
    };
    return (
      <li>
        <span>{/* Product name */}</span> - <span>votes: {/* Number of votes*/}</span>
        <button onClick={plus}>+</button>{" "}
        <button onClick={minus}>-</button>
      </li>
    );
  };

  const GroceryApp = (props) => {
    let [products, setProducts] = React.useState(props.products);
    const onVote = (dir, index) => {
      // Update the products array accordingly ...
    };

    return (
      <ul>
        {/* Render an array of products, which should call onVote when + or - is clicked */}
      </ul>
    );
}

