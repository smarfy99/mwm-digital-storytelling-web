import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const database = getDatabase();

type Message = {
  name: string;
  text: string;
  timestamp: number;
};

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    const input = inputRef.current?.value;
    const user = userRef.current?.value;

  }

  return (
    <div>
      <input type="text" ref={userRef} className="flex outline-0 underline-offset-auto" />
      <input type="text" ref={inputRef} className="flex outline-0 underline-offset-auto" />
      <button type="submit" className="flex text-slate-100 ">
        확인
      </button>
    </div>
  );
};

export default Input;
