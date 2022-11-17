import { Link } from "react-router-dom";

export default function CardPopular({title, srcImg, pathToMovie}){
    return(
        <Link className="min-w-[170px] w-[150px] bg-transparent h-full transition-all duration-150 hover:font-extrabold text-md">
            <img src={srcImg} className='inline-block w-full h-full'/>
            <p>{title}</p>
            <p className="text-xs italic text-slate-600"></p>
        </Link>
    )
}