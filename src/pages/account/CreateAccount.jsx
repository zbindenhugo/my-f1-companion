import { useState } from 'react'
import './CreateAccount.css'

export default function CreateAccount() {

    const [firstname, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const [pwdVisible, togglePwdVisible] = useState(false);
    const [confPwdVisible, toggleConfPwdVisible] = useState(false);

    return(
        <div className="container">
            <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
                <div className="max-w- mx-auto">
                    <p className="font-bold text-center text-[#d90429] sm:text-5xl text-xl">You want to join us ? </p>

                    <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
                        Create a new account, and discuss with others about races. Show to the other that you are the biggest fan of F1 !
                    </p>

                    <form action="" className="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4 bg-[#EDF2F4]">
                        <div className='sm:grid sm:grid-cols-2 sm:gap-3'>
                            <div>
                                <label htmlFor="firstname" className="sm:text-xl text-sm font-medium">First name</label>

                                <div className="relative mt-1">
                                    <input
                                        type="text"
                                        id="firstname"
                                        className="w-full p-4 pr-12 sm:text-xl text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Enter your first name"
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastname" className="sm:text-xl text-sm font-medium">Last name</label>

                                <div className="relative mt-1">
                                    <input
                                        type="text"
                                        id="lastname"
                                        className="w-full p-4 pr-12 sm:text-xl text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="sm:text-xl text-sm font-medium">Email</label>

                            <div className="relative mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-4 pr-12 sm:text-xl text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <span className="absolute inset-y-0 inline-flex items-center right-4">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={"2"}
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className='md:grid md:grid-cols-2 md:gap-3'>
                            <div>
                                <label htmlFor="password" className="sm:text-xl text-sm font-medium">Password</label>

                                <div className="relative mt-1">
                                    <input
                                        type={pwdVisible ? "text" : "password"}
                                        id="password"
                                        className="w-full p-4 pr-12 sm:text-xl text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Enter password"strokeWidth
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <span className="absolute inset-y-0 inline-flex items-center right-4 hover:cursor-pointer" as={"button"} onClick={() => {togglePwdVisible(!pwdVisible)}}>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={"2"}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={"2"}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sm:text-xl text-sm font-medium">Confirm password</label>

                                <div className="relative mt-1">
                                    <input
                                        type={confPwdVisible ? "text" : "password"}
                                        id="password"
                                        className="w-full p-4 pr-12 sm:text-xl text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Enter password"strokeWidth
                                        value={confirmPwd}
                                        onChange={(e) => setConfirmPwd(e.target.value)}
                                        required
                                    />

                                    <span className="absolute inset-y-0 inline-flex items-center right-4 hover:cursor-pointer" as={"button"} onClick={() => {toggleConfPwdVisible(!confPwdVisible)}}>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={"2"}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={"2"}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="block w-fit mx-auto px-5 py-3 sm:text-xl text-sm font-medium text-white bg-[#d90429] rounded-lg">
                            Create my account
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}