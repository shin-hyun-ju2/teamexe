import { useState, useRef, useEffect } from 'react';
import "../styles/Chatbot.css";


const Chatbot = () => {
    const [messages, setMessages] = useState([]); //메세지 상태관리
    const [inputMessage, setInputMessage] = useState("");//사용자 입력상태 관리
    const [chatbotData, setChatbotData] = useState(null);//챗봇 데이터 상태관리
    const messagesEndRef = useRef(null); //메시지 리스트 끝부분으로 이동하기 위함

    
    //메시지 리스트를 자동으로 스크롤
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    //메시지를 응답받으면 화면 맨 아래로 스크롤 이동
    useEffect(() => {
        scrollToBottom();
    },[messages]);


    //fetch API를 사용하여 JSON 데이터 가져오기
  useEffect(() => {
    const fetchChatbotData = async () => {
      try {
        const response = await fetch("/data/chatbotData.json"); // JSON 파일 경로 수정
        if (!response.ok) {
          throw new Error("데이터를 가져오지 못했습니다.");
        }
        const data = await response.json();
        setChatbotData(data); // 가져온 데이터 상태에 저장
      } catch (error) {
        console.error("Fetch 에러:", error);
      }
    };

    fetchChatbotData();
  }, []);

    //메시지 전송 처리
    const handleSendMessage  = () => {
        if(inputMessage.trim() && chatbotData){
            
            //사용자 메시지 추가
            const userMessage  = { type: "user", text: inputMessage };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            //키워드 기반 응답 검색
            const response  = chatbotData.responses.find((item)  => 
                inputMessage.toLowerCase().trim().includes(item.keyword.toLowerCase().trim())
            );

            //봇 메시지 생성
            const botMessage = {
                type:"bot",
                text: response ? response.response : chatbotData.defaultResponse
            };

            //봇 메시지 추가
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setInputMessage(""); //입력필드 초기화

        }
    };

    //엔터 키로 메시지 전송
    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleSendMessage();
        }
    }

    return(
        <div className='cahtbot-container'>
            {/* 메시지 리스트 */}
        <div className="message-list">
            {messages.map((message, index) => (
            <div
                key={index}
                className={message.type === "user" ? "user-message" : "bot-message"}
            >
                {message.text}
            </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

            {/* 메시지 입력 필드 */}
            <div className="input-container">
                <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <button onClick={handleSendMessage}>📩</button>
            </div>
        </div>
    );
};

export default Chatbot;