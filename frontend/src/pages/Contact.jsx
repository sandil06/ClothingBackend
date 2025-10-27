import React from "react";
 
 

const ContactPage = () => {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                  Contact Us
                </p>
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  We're here to help! If you have any questions or need assistance, please reach out to us using the form below or contact us directly.
                </p>
              </div>
            </div>

            <form className="flex flex-col gap-4 max-w-[480px] px-4 py-3">
              <label className="flex flex-col">
                <span className="text-white text-base font-medium pb-2">Your Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-input rounded-lg border border-gray-700 p-4 text-white placeholder-gray-400 bg-[#111] focus:outline-none focus:border-gray-500"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white text-base font-medium pb-2">Your Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input rounded-lg border border-gray-700 p-4 text-white placeholder-gray-400 bg-[#111] focus:outline-none focus:border-gray-500"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white text-base font-medium pb-2">Subject</span>
                <input
                  type="text"
                  placeholder="Enter the subject"
                  className="form-input rounded-lg border border-gray-700 p-4 text-white placeholder-gray-400 bg-[#111] focus:outline-none focus:border-gray-500"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white text-base font-medium pb-2">Message</span>
                <textarea
                  placeholder="Enter your message"
                  className="form-input rounded-lg border border-gray-700 p-4 text-white placeholder-gray-400 min-h-[150px] bg-[#111] focus:outline-none focus:border-gray-500"
                ></textarea>
              </label>

              <button
                type="submit"
                className="bg-[#111] border border-gray-700 text-white font-bold px-4 py-3 rounded-lg hover:bg-[#141414] transition"
              >
                Submit
              </button>
            </form>

            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Contact Information</h3>
            <p className="text-gray-300 text-base font-normal leading-normal pb-3 pt-1 px-4">Email: support@sehera.com</p>
            <p className="text-gray-300 text-base font-normal leading-normal pb-3 pt-1 px-4">Phone: (555) 123-4567</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ContactPage;
