import { useEffect, useRef, useState } from 'react';
import { database } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import DataSphere from './DataSphere';

export interface Message {
  name?: string;
  text: string;
  timestamp: number;
}

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    //  파이어베이스에서 초기 데이터를 가져온다.
    const messageRef = ref(database, 'messages');
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        const messageList: Message[] = Object.values(data);
        setMessages(messageList);
      }
    });
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault(); // 새로고침 방지
    const input = inputRef.current?.value;
    const user = userRef.current?.value;

    if (input) {
      const newMessage: Message = {
        name: user,
        text: input,
        timestamp: Date.now(),
      };

      // message를 firebase에 넣기
      push(ref(database, 'messages'), newMessage);

      // clear input
      if (inputRef.current) {
        inputRef.current!.value = '';
        userRef.current!.value = '';
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center">
        <div className="flex text-white">무엇에 중독되어 있다고</div>
        <div className="flex text-white">생각하시나요?</div>
        <div className="flex justify-center items-center z-50 my-3">
          <form className="flex flex-col justify-center items-center">
            <input
              type="text"
              autoFocus
              ref={userRef}
              placeholder="이름을 입력해주세요."
              className="flex text-white bg-slate-700 h-8 rounded-lg outline-0 underline-offset-auto p-2 my-2 focus:border-b-2 focus:border-b-[#6EFFF1] placeholder:italic placeholder:text-slate-400"
            />
            <input
              type="text"
              ref={inputRef}
              placeholder="ex)일"
              className="flex text-white bg-slate-700 h-8 rounded-lg outline-0 underline-offset-auto p-2 focus:border-b-2 focus:border-b-[#6EFFF1] placeholder:italic placeholder:text-slate-400"
            />
            <button
              type="submit"
              onClick={sendMessage}
              className="flex text-slate-100 justify-center items-center bg-gradient-to-r from-[#6ED2FF] to-[#8CE2D2] w-24 h-8 rounded-2xl mt-4"
            >
              확인
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <DataSphere messages={messages} />
      </div>
    </div>
  );
};

export default Input;
