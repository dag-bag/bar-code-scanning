import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
export default function Result({ status }: { status: boolean }) {
  return (
    <div className="bg-white px-6  md:mx-auto mt-20 flex justify-center items-center flex-col">
      {status ? (
        <BsFillCheckCircleFill className="text-green-500 text-5xl" />
      ) : (
        <AiFillCloseCircle className="text-red-500 text-5xl" />
      )}
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          {status ? "Success" : "Failed"}
        </h3>
        <p className="text-gray-600 my-2">Thank you for registering with us.</p>
        <p> Have a great day!</p>
      </div>
    </div>
  );
}

const style = {
  icon: "",
};
