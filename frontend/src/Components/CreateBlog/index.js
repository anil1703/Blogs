import { useState } from "react";
import Header from "../Header";
const CreateBlog = () => {
    const [title, setTitle] = useState("");
    return (
        <Header/>
    )
}

export default CreateBlog