import { useState } from "react";


function SearchForm({ onSearch }) {

    let [input, setInput] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (trimmedInput !== "") {
            onSearch(trimmedInput);
        }
    }

    const FormSubmit=(event)=> {
        if (event.keyCode === 13) {
            console.log("enter")
        }
    }

    const handleClear = (event) => {
        onSearch("");
        setInput("")
    }

    return (
        <div className="SearchForm">
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search Boards" onKeyDown={(e) => FormSubmit(e)}></input>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClear}>Clear</button>
            </form>
        </div>
    )
}

export default SearchForm