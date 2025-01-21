// import { ListFlow } from "../../dist/index.es.js";
import ListFlow from "../components/ListFlow";
import React from "react";
import sty from "./index.module.css";

interface User {
  id: number;
  name: string;
  bio: string;
}
let count = 0;
let networkError = false;
let isEmpty = false;
const dataList: User[] = [
  {
    id: 1,
    name: "John Doe1",
    bio: "John Doe1 bio",
  },
  {
    id: 2,
    name: "Jane Doe2",
    bio: "Jane Doe2 bio",
  },
  {
    id: 3,
    name: "Jane Doe3",
    bio: "Jane Doe3 bio",
  },
  {
    id: 4,
    name: "Jane Doe4",
    bio: "Jane Doe4 bio",
  },
  {
    id: 5,
    name: "Jane Doe5",
    bio: "Jane Doe5 bio",
  },
];
const Demo = () => {
  const request = () => {
    return new Promise<{ data: User[] }>((resolve, reject) => {
      setTimeout(() => {
        count++;

        if (networkError) {
          return reject("error");
        }

        if (isEmpty) {
          return resolve({ data: [] });
        }

        if (count > 4 && count < 6) {
          return reject("error");
        }

        if (count > 10) {
          return resolve({
            data: [],
          });
        }
        resolve({
          data: dataList,
        });
      }, 1000);
    });
  };

  return (
    <div className="w-[50%]">
      <div className="text-2xl font-bold pb-4">User page</div>

      <ListFlow<User>
        className={sty.demoContainer}
        request={request}
        renderItem={(item) => (
          <div className="flex flex-col justify-center items-center p-4 bg-white rounded-md">
            <div>{item.name}</div>
            <div>{item.bio}</div>
          </div>
        )}
      />
    </div>
  );
};

export default Demo;
