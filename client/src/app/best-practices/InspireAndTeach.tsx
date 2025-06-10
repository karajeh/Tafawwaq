'use client'
import Button from "../components/Button";

export default function InspireAndTeach() {
    return (

        <div className="text-black md:max-h-56 flex flex-col  w-full md:flex-row mx-auto sm:py-24 py-12 sm:px-24 px-10 mt-4 mb-0 md:justify-between justify-center items-center bg-background_blue gap-4">
            <div className="md:w-1/2 flex md:text-left justify-center text-xl sm:text-2xl lg:text-3xl font-semibold text-center sm:font-bold text-black" >
                <p className=''>Ready to inspire and teach?
                    Start your journey with our community of educators today.
                </p>
            </div>
            <div className="w-48 " >
                <Button label="Signup" classNames="rounded-xl" />

            </div>
        </div>

    );
}