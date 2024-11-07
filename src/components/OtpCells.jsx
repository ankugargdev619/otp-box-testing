import { useEffect, useRef, useState } from "react";

export const OtpCells = ({cellCount,isDisabled,setIsDisabled}) => {
    const [time, setTime] = useState(120);
    const [isOtpVisible,setOtpVisible] = useState(false);
    const inputRef = useRef({});

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(time>0){
                setTime(time-1);
            }
        },1000)
        return ()=>{
            clearInterval(interval);
        }
    },[time]);

    return <div>
        <div className="mt-6 flex justify-center gap-4">
            {Array.from({length : cellCount}).map((_,i) => (  
                <input
                    key={i}
                    ref={(element)=> inputRef.current[i] = element}
                    type={isOtpVisible?"text" : "password"}
                    className="w-10 h-10 rounded-lg bg-slate-500 bg-opacity-50 text-center"
                    onChange={(e)=>{
                        if(e.target.value != "" && i < cellCount-1) {
                            inputRef.current[i+1].focus();
                        }
                        
                        if(inputRef.current[cellCount-1].value != ""){
                            setIsDisabled(false);
                        } else {
                            setIsDisabled(true);
                        }
                    }}

                    onKeyDown={(e)=>{
                        const pattern = /^[0-9]$/;
                        const allowed = ["Backspace", "ArrowRight","ArrowLeft","Delete"];

                        if(!(pattern.test(e.key) || allowed.includes(e.key)) ){
                            e.preventDefault();
                        }

                        if(e.key == "Backspace" ){
                            if((e.target.value == "") && i>0){
                                inputRef.current[i-1].focus();
                            }
                        }
                    }}

                    onFocus={()=>{
                        if(i >0 && inputRef.current[i-1].value == ""){
                            inputRef.current[i-1].focus();
                        }
                    }}

                ></input>
            ))}

            <button
            onClick={()=>{
                setOtpVisible(!isOtpVisible);
            }}
            >
                {isOtpVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                }

            </button>
        </div>
        <div className="mt-4">{time>0 ? formatTime(time) : <button>Resend OTP</button>}</div>
    </div>
}

function formatTime(time)  {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${minutes>=10 ? minutes : "0"+minutes}:${seconds>=10?seconds : "0"+seconds}`
}