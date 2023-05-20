import { useRef } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import {getDatabase} from 'firebase/database';

const database = getDatabase();

type Message = {
    name: string;
    text: string;
    timestamp: number;
}

const Input = () => {
  return (
    <div> 
        <input type="text" className="flex outline-0 underline-offset-auto" />
        <input type="text" className="flex outline-0 underline-offset-auto" />
        <button type="submit" className="flex text-slate-100 ">
            확인
        </button>
    </div>
  )
}

export default Input