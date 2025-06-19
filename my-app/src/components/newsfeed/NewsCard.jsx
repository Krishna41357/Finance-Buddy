import React from 'react'

const NewsCard = ({title , summary , image , label , url }) => {
  return (
    <>
    <div className="w-full max-w-screen-xl mx-auto h-fit px-4">

      <div className="flex bg-white w-[110%] rounded-lg overflow-hidden shadow-sm">
                       <div className="img-div bg-black">
                        <img
                            src={image || "/blog-left.png"}
                            alt="Blog Cover"
                            className="w-full h-60 object-cover"
                        />
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <h4 className="title text-lg text-left font-semibold text-gray-900">
                               {title ||" Credit Cards for Beginners: Smart Tips to Stay Debt-Free"}
                            </h4>
                            <p className=" summary text-gray-500 text-left text-xs">
                                {summary || "Understand the benefits and risks of credit cards, how to build a good credit score, and how to use them responsibly."}
                            </p>
                            <div className="flex items-center   justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="/Ellipse-user.png"
                                        alt="Author"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <span className="text-gray-700 text-sm">{label}</span>
                                </div>
                                <button className="w-fit h-fit pr-2 pl-2 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                                   <span className='text-green-500'><a href={url} target="_blank">Read More</a></span> <span className="text-green-500 text-lg">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

    </div>
    </>
  )
}

export default NewsCard;
