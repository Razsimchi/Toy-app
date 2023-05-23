import { Link, useNavigate } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToysList({ toys, onRemoveToy }) {
    const navigate = useNavigate()
    return <ul className="toy-list">
        {toys.map(toy =>
            <li onClick={()=> navigate(`/toy/${toy._id}`)} className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button onClick={(event)=>{
                        event.stopPropagation()
                        onRemoveToy(toy._id)
                    }
                    } >x</button>
                    <Link to = {`/toy/edit/${toy._id}`}
                     onClick={(event) => event.stopPropagation()}
                        >Edit</Link> 
                </div>
            </li>)}
    </ul>
}