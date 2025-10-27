import React from "react";
 
 

const AboutPage = () => {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* About Us */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                About Us
              </p>
            </div>
            <p className="text-gray-300 text-base font-normal leading-normal pb-3 pt-1 px-4">
              At SEHERA, we believe that clothing is more than just fabric and stitches; it's a form of self-expression.
              Our journey began with a simple idea: to create high-quality, stylish apparel that empowers individuals to
              embrace their unique identity. We are committed to sustainable practices, ethical sourcing, and timeless
              designs that transcend fleeting trends.
            </p>

            {/* Image */}
            <div className="flex w-full grow bg-black @container py-3">
              <div className="w-full gap-1 overflow-hidden bg-black @[480px]:gap-2 aspect-[3/2] flex">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQd9-VqmRGqKwmJT33Z3JKJ8RVPWgl5eNzlwdOTXp2miXSqHfTXrTn7_R6lY8lM1A81ku63GMOho6uoJ1g1yyI31rLtc_pUdfGATBbpy0SPeR-gLcAOxm64OXSnZp_SJFN91pfzQHYxsOVgKQmVnwtZTWoxSxq8pXy9z2MdJ_J0iBj-9pJJb9TzL8klii5bYnAj_Yu8xEiuV0vWMfvPC2JZ82rIwhHzWru-iVFuP31gDcLIhk5MGSETRdFiqkk8CxphBkZa6jhlYE")',
                  }}
                ></div>
              </div>
            </div>

            {/* Mission */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Our Mission
            </h2>
            <p className="text-gray-300 text-base font-normal leading-normal pb-3 pt-1 px-4">
              Our mission is to provide exceptional clothing that not only looks good but also feels good to wear.
              We strive to create a positive impact on the fashion industry by prioritizing sustainability, ethical
              production, and inclusivity. We aim to inspire confidence and individuality through our thoughtfully
              designed collections.
            </p>

            {/* Values */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Our Values
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {/* Sustainability */}
              <div className="flex flex-1 gap-3 rounded-lg border border-gray-800 bg-[#111] p-4 flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">Sustainability</h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    We are dedicated to minimizing our environmental footprint through sustainable materials and responsible manufacturing processes.
                  </p>
                </div>
              </div>

              {/* Ethical Practices */}
              <div className="flex flex-1 gap-3 rounded-lg border border-gray-800 bg-[#111] p-4 flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">Ethical Practices</h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    We ensure fair wages and safe working conditions for all our employees and partners throughout our supply chain.
                  </p>
                </div>
              </div>

              {/* Community */}
              <div className="flex flex-1 gap-3 rounded-lg border border-gray-800 bg-[#111] p-4 flex-col">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <h2 className="text-white text-base font-bold leading-tight">Community</h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    We foster a community of creativity, inclusivity, and empowerment, celebrating the diversity of our customers and collaborators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
