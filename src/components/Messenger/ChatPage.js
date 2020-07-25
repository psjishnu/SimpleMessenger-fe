import React, { useEffect, useState } from "react";
import "./chatpage.css";
import { useDispatch, useSelector } from "react-redux";
import { question, getmsgs } from "../../Redux/actions";

const ChatPage = ({ userId }) => {
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const User = currentUser.data;
    const [Input, setInput] = useState("");
    const dispatch = useDispatch();
    const [Rece, setRece] = useState();
    const [received, setreceived] = useState();
    const [render, Setrender] = useState(Math.random());

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getmsgs({ receiver: userId }))
            .then((res) => {
                if (res && res.data !== undefined) {
                    setreceived(res.data.Messages);
                    setRece(res.data.receiver);
                }
            })
            .then(() => {
                const msgbox = document.getElementById("message-box");
                msgbox.scrollTop = msgbox.scrollHeight;
            });
    }, [render, dispatch, userId]);

    const sendMsg = () => {
        dispatch(question({ msg: Input, receiver: userId })).then((res) => {
            setInput("");
            Setrender(Math.random());
            const msgbox = document.getElementById("message-box");
            msgbox.scrollTop = msgbox.scrollHeight;
        });
    };

    return (
        <div className="flex flex-col items-center px-3">
            <div className="main-card mt-16 w-full md:w-1/2 lg:w-2/5">
                <div className="main-title flex py-4 px-4 bg-green-700 text-sm lg:text-lg font-bold">
                    <span className="w-1/2">
                        {Rece && <p className="truncate">{Rece.name}</p>}
                    </span>
                    <div className="text-right w-1/2">
                        <button
                            onClick={() => {
                                Setrender(Math.random());
                            }}
                            className="bg-white hover:bg-black text-black hover:text-white shadow-md rounded-lg px-2 py-1">
                            Refresh
                        </button>
                    </div>
                </div>
                <div className="chat-area" id="message-box">
                    {received &&
                        received.map((value, id) => {
                            return (
                                <div key={id + 1}>
                                    {value.author === User.data.email ? (
                                        <div className="chat-message-div">
                                            <span
                                                style={{ flexGrow: 1 }}></span>
                                            <div className="chat-message">
                                                {value.msg}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="chat-message-div">
                                            <div className="chat-message">
                                                {value.msg}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
                <div className="input-div flex flex-row" id="end">
                    <input
                        className="input-message text-black w-5/6"
                        name="message"
                        type="text"
                        id="message"
                        value={Input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (13 === (e.keyCode || e.which)) {
                                sendMsg();
                            }
                        }}
                    />
                    <button
                        className="input-send bg-green-700 mr-2 items-center text-center"
                        onClick={sendMsg}>
                        <svg className="ml-3 h-6 w-6">
                            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;