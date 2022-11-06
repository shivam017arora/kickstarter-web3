import React from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, addresses } from "../constants";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";

export default function Home() {
  const { chainId, isWeb3Enabled } = useMoralis();

  const factoryAddress =
    parseInt(chainId) in addresses ? addresses[parseInt(chainId)][0] : null;

  const [formData, setFormData] = React.useState({
    title: "",
    desc: "",
    target: 0,
    deadline: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      hour: new Date().getHours(),
      minutes: new Date().getMinutes(),
      t: "AM",
    },
    image: null,
    min_fund: 0,
  });

  const getUnixDate = (date) => {
    return Math.floor(date.getTime() / 1000);
  };

  const getIpfsHash = async () => {};

  const { runContractFunction: createProject } = useWeb3Contract({
    abi,
    contractAddress: factoryAddress,
    functionName: "createNewProject",
    params: {
      _title: formData.title,
      _description: formData.desc,
      _project_target_price: formData.target,
      _projest_deadline_date_unix: () =>
        getUnixDate(
          new Date(
            formData.deadline.day,
            formData.deadline.month,
            formData.deadline.year,
            formData.deadline.hour,
            formData.deadline.minutes,
            0
          )
        ),
      _project_minimum_fund_price: formData.min_fund,
      _ipfs_cid: () => getIpfsHash(),
    },
  });

  return (
    <div className="flex justify-center items-center flex-col gap-y-5">
      <div className="flex gap-x-5 justify-start items-center flex-row">
        <label className="text-2xl"> Title </label>
        <input
          className="shadow appearance-none border rounded w-64 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-y-5 justify-center items-center flex-col w-200">
        <label className="text-2xl"> Why are you trying to raise fund? </label>
        <textarea
          type="text"
          className="w-200 bg-transparent border border-white p-2"
          rows={2}
          cols={40}
          value={formData.desc}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              desc: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-x-5 mt-4">
        <label className="text-md"> Target Amount </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          type="number"
          value={formData.target}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              target: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-y-5 justify-center items-center flex-col w-200">
        <label className="text-2xl"> Choose a deadline </label>
        <div className="flex gap-x-5">
          <div className="flex items-center gap-x-2">
            <label> D: </label>
            <input
              type="number"
              className="w-10 p-1"
              value={formData.deadline.day}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: {
                    ...prev.deadline,
                    day: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label> M: </label>
            <input
              type="number"
              className="w-10 p-1"
              value={formData.deadline.month}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: {
                    ...prev.deadline,
                    month: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label> Y: </label>
            <input
              type="number"
              className="w-16 p-1 text-center"
              value={formData.deadline.year}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: {
                    ...prev.deadline,
                    year: e.target.value,
                  },
                }))
              }
            />
          </div>
        </div>
        <div className="flex gap-x-5">
          <div className="flex items-center gap-x-2">
            <label> H: </label>
            <input
              type="number"
              className="w-14 text-center pl-2"
              value={formData.deadline.hour}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: {
                    ...prev.deadline,
                    hour: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label> M: </label>
            <input
              type="number"
              className="w-14 text-center pl-2"
              value={formData.deadline.minutes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: {
                    ...prev.deadline,
                    minutes: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label> T: </label>
            <select
              className="w-14 text-center p-1"
              value={formData.deadline.t}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: {
                    ...prev.deadline,
                    t: e.target.value,
                  },
                }))
              }
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="flex gap-x-5 mt-4 justify-center items-center ml-24">
          <label className="">Project Cover</label>
          <input
            type="file"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.files[0],
              }))
            }
          />
        </div>
        <div className="flex gap-x-5 mt-4">
          <label className="text-md"> Min. Fund Amount </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            type="number"
            value={formData.min_fund}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                min_fund: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div>
        <button
          className="border boder-white rounded-md h-16 w-64 mb-30 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300"
          onClick={async (e) => {
            e.preventDefault();
            console.log(formData);
            console.log(getIpfsHash());
            // await createProject({
            //   onSuccess: async (tx) => console.log(tx),
            //   onError: (error) => {
            //     console.log(error);
            //   },
            // });
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
