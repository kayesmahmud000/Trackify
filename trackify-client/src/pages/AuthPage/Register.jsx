import { Link, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import authContext from "../../context/authContext";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {createUser}=useContext(authContext)
    const navigate= useNavigate()
    const onSubmit = async(data) =>{
        const name= data?.name
        const email= data?.email
        const password= data?.password

        console.log(name, email, password)
        try{
            await createUser(email, password)
            navigate('/main')
        }catch{
            //
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen '>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Create Account</h1>
                    <p className='text-sm text-gray-400'>
                        Welcome to Trackify
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='Name'
                                id='Name'
                                {...register("name", { required: true, maxLength: 20 })}
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#1e172b] bg-gray-200 text-gray-900'

                            />
                            {errors.name && <span className='text-red-400 text-xs'> name is required</span>}
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                {...register("email", { required: true, })}
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#1e172b] bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {errors.email && <span className='text-red-400 text-xs'> email required</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    },
                                    validate: {
                                        hasCapitalLetter: (value) => /[A-Z]/.test(value) || 'Password must contain at least one capital letter',
                                        hasSpecialCharacter: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain at least one special character',
                                    },
                                })}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#1e172b] bg-gray-200 text-gray-900"
                            />
                            {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-[#1e172b] w-full rounded-md py-3 text-white'
                        >
                            Continue
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <GoogleLogin></GoogleLogin>
                <p className='px-6 text-md text-center '>
                    Already have an account?{' '}
                    <Link
                        to='/'
                        className='hover:underline hover:text-[#1e172b] '
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Register;