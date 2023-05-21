import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase();

type Message = {
  name?: string;
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

    if (input) {
      const message: Message = {
        name: user,
        text: input,
        timestamp: Date.now(),
      };
    }
  };

  // message를 firebase에 넣기
  const newMessageRef = push(ref(database, 'messages'), messages);

  // clear input
  inputRef.current!.value = '';

  // firebase에서 다시 불러오기
  const messageRef = ref(database, 'messages');
  onValue(messageRef, (snapshot) => {
    const data = snapshot.val();
    const messageList: Message[] = [];

    for (let key in data) {
      messageList.push({
        name: data[key].name,
        text: data[key].text,
        timestamp: data[key].timestamp,
      });
    }
    setMessages(messageList);
  });

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.name}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div>
        <input type="text" ref={userRef} className="flex outline-0 underline-offset-auto" />
        <input type="text" ref={inputRef} className="flex outline-0 underline-offset-auto" />
        <button type="submit" onClick={sendMessage} className="flex text-slate-100 ">
          확인
        </button>
      </div>
    </div>
  );
};

export default Input;
