import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice"; // adjust the path as needed
import { formatDate } from "../redux/formatDate";
import { FaEdit, FaTrash, FaEye, FaCopy, FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const iconStyle = "text-gray-700 hover:text-blue-500";

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="px-5 py-2 rounded min-w-[550px]  sm:min-w-[700px] md:min-w-[960px] lg:min-w-[1135px] mb-5 p-2 bg-white border border-gray-300 text-black"
        type="search"
        placeholder="Search paste here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col sm:min-w-[600px] md:min-w-[850px] lg:min-w-[1135px] gap-4 rounded border border-gray-300 p-3 text-black">
        <div className="flex text-2xl font-bold">All Pastes</div>
        <hr />
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border rounded p-5 flex flex-col lg:flex-row justify-between gap-3"
                key={paste?._id}
              >
                <div className="">
                  <div className="text-left text-3xl font-medium flex mb-2">
                    {paste.title}
                  </div>
                  <div className="text-left text-xs text-gray-500 flex pl-1">
                    {paste.content}
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-row  justify-start gap-5">
                    <a href={`/?pasteId=${paste?._id}`}>
                      <button className="p-2 bg-white border rounded  hover:bg-gray-100">
                        <FaEdit className={iconStyle} />
                      </button>
                    </a>
                    <a href={`/pastes/${paste?._id}`}>
                      <button className="p-2 bg-white rounded hover:bg-gray-100">
                        <FaEye className={iconStyle} />
                      </button>
                    </a>

                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="p-2 bg-white rounded hover:bg-gray-100"
                    >
                      <FaTrash className={iconStyle} />
                    </button>

                    <button
                      className="p-2 bg-white border rounded hover:bg-gray-100"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <FaCopy className={iconStyle} />
                    </button>

                    <button
                      className="p-2 bg-white border rounded hover:bg-gray-100"
                      onClick={() => {
                        if (navigator.share) {
                          // navigator
                          //   .share({
                          //     title: paste.title,
                          //     text: paste.content,
                          //   })
                          navigator
                            .share({
                              title: paste.title,
                              text: `${paste.title}\n\n${paste.content}`,
                            })

                            .then(() => toast.success("Shared successfully"))
                            .catch((error) => {
                              console.error("Share failed:", error);
                              toast.error("Sharing failed");
                            });
                        } else {
                          toast.error("Sharing not supported on this device");
                        }
                      }}
                    >
                      <FaShareAlt className={iconStyle} />
                    </button>
                  </div>
                  <div className="flex justify-start pl-2">Created At: {formatDate(paste.createdAt)}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
