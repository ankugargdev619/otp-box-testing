import { OtpCells } from "./OtpCells"

export const OtpPage = () => {
    return <div className="flex flex-col items-center justify-center text-slate-50 text-center h-screen">
        <div className="text-3xl">
            <span className="text-[#3EDDCE]">Webinar</span>.gg
        </div>
        <div className="mt-10 text-2xl font-bold">Check Your Email For A Code</div>
        <div className="mt-14">
            <p className="text-sm text-slate-400">Please enter the verification code sent to your email id test@gmail.com</p>
        </div>
        
        <OtpCells cellCount="6" />

        <button className="mt-10 w-64 h-10 bg-slate-500 rounded-lg">Verify</button>
        <div className="mt-4">Can't find the email? Click <a className="underline" href="#">here</a> to resend.</div>
    </div>
}