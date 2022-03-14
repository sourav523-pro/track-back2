import React from 'react'

const CustomCard = ({ title, description, viewCount, img, category }) => {
    return (
        <div className="p-1 sm:p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                <img className="h-auto w-full object-cover object-center" src={img.url} alt={title} />
                <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font uppercase font-medium text-gray-500 mb-1">{category}</h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                    <p className="leading-relaxed mb-3">{description}</p>
                    <div className="flex items-center flex-wrap ">
                        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Download Now
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1"> {/*border-r-2 border-gray-300*/}
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>{viewCount}
                        </span>
                        {/* <span className="text-gray-600 inline-flex items-center leading-none text-sm">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>{viewCount}
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomCard