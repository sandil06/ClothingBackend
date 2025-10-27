import React from "react";

const ProductCard = ({ product, title, subtitle, img }) => {
  const data = product || { title, subtitle, img };
  return (
    <div className="bg-[#111] border border-gray-700 rounded-xl p-3">
      <div
        className="rounded-lg overflow-hidden aspect-[3/4] bg-center bg-cover"
        style={{ backgroundImage: `url(${data?.img})` }}
      />
      <div className="pt-3">
        <p className="text-base font-medium text-white">{data?.title}</p>
        {data?.subtitle && <p className="text-sm text-gray-300">{data.subtitle}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
