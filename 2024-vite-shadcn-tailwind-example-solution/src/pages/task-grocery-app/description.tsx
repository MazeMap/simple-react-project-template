export default function Description() {
    return <div className="space-y-4">
        <p>
            You have a GroceryApp component, which receives a list of products, each one with name and votes. The app should render an unordered list, with a list item for each product. Products can be upvoted or downvoted.
        </p>
        <p>
        By appropriately using React state and props, implement the upvote/downvote logic. Keep the state in the topmost component, while the Product component should accept props.
        </p>
        <p>
            { `For example, passing the following array as products prop to GroceryApp [{ name: "Oranges", votes: 0 }, { name: "Bananas", votes: 0 }] and clicking the '+' button next to the Oranges should result in HTML like:` }
        </p>
        <pre>
            {
                `<div id="root">\n  <ul>\n    <li>\n      <span>Oranges</span> - <span>votes: 1</span><button>+</button> <button>-</button>\n    </li>\n    <li>\n      <span>Bananas</span> - <span>votes: 0</span><button>+</button> <button>-</button>\n    </li>\n  </ul>\n</div>`
            }
        </pre>
    </div>
}