import React from 'react';

const PageNotFound = () => {
    return (
        <>
            <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white h-screen w-screen flex flex-col justify-center items-center text-center px-4">
                <div className="relative ">
                    <div className="animate-spin text-6xl mb-0">😵</div>
                    <h1 className="text-[120px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-red-600">
                        404
                    </h1>
                    <span className="absolute bottom-0 right-0 rotate-15 translate-x-7 translate-y-0 bg-[#ffffff] animate-bounce text-black text-sm font-semibold px-2 py-1 border-1 rounded shadow-lg font-mono">
                        Lost?
                    </span>
                </div>

                <p className="text-3xl font-semibold mt-4 animate-fade-in">
                    Page Not Found
                </p>
                <p className='my-4 text-gray-500'>The page you’re looking for doesn’t exist or may have been removed!</p>

                <a
                    href="/"
                    className="mt-5 inline-block px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-black font-bold shadow-md transition-transform duration-300 transform hover:scale-110 hover:shadow-xl hover:from-pink-500 hover:to-yellow-400"
                >
                    Go Home
                </a>
            </section>

        </>
    );
};


export default PageNotFound;
