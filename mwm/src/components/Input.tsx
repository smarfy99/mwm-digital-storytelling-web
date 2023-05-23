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
      <div className="flex flex-col justify-center items-center mr-80">
        <div className="flex text-white">여러분은 무엇에 중독되어 있다고 생각하시나요?</div>
        <div className="flex z-50">
          <form>
            <input
              type="text"
              autoFocus
              ref={userRef}
              placeholder="이름을 입력해주세요."
              className="flex outline-0 underline-offset-auto my-2  placeholder:italic placeholder:text-slate-400"
            />
            <input
              type="text"
              ref={inputRef}
              placeholder="ex)일"
              className="flex outline-0 underline-offset-auto placeholder:italic placeholder:text-slate-400"
            />
            <button type="submit" onClick={sendMessage} className="flex text-slate-100 ">
              확인
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center w-60 h-60">
        <DataSphere messages={messages} />
      </div>
    </div>
  );
};

export default Input;
