## introduce

listflow-react is a flexible and customizable React component designed to simplify the implementation of infinite scrolling lists with pagination. It allows you to load data seamlessly as users scroll through the page, providing a smooth and efficient user experience. ListFlow comes with built-in support for loading states, error handling, and pagination, making it easy to integrate into your existing projects.

**Key Features:**

1. Infinite Scrolling: Automatically loads more data as the user scrolls.

2. Pagination Support: Easily manage paginated data sources.

3. Loading States: Display loading indicators while fetching data.

4. Error Handling: Show error messages when data fetching fails.

5. Customizable: Highly configurable to match your project's design and requirements.

## Screenshots

![pic](https://github.com/Tem-man/listflow/blob/main/listflow-demo2.gif)

## Installation

```
npm i listflow-react
yarn add listflow-react
pnpm add listflow-react

```

## Usage

```tsx
import { ListFlow } from "listflow-react";
import "listflow-react/index.css";
interface User {
  id: number;
  name: string;
  bio: string;
}
const Demo = () => {

  return (
    <div className="w-[50%]">
      <div>Users page</div>

      <ListFlow<User>
        className={sty.demoContainer}
        request={async (params) => {
          const res = await userApi.getUserList(params);
          return {
            data: res.data,
          };
        }}
        params={{
          pageSize: 10,
          ...
        }}
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
```

## props

#### request

     type: (pageParams: PageParams) => Promise<any>;
     default:require
     description: This function is used to request network data

#### renderItem

    type: (item: T) => ReactNode;
    default:require
    description: Render function that must return a ReactNode, item is the current item data returned by the network request

#### params

    type: Record<string, any>;
    default:{}
    description: Request parameters

#### className

    type: string;
    default:''
    description:It is used to set the style of the ListFlow component

#### loadingComponent

    type: ReactNode;
    default:<div>Loading...</div>
    description: This component is rendered while data is loading initially.

#### emptyComponent

    type: ReactNode;
    default:<div>No Data</div>
    description: Component rendered when there is no data

#### loadingMoreComponent

    type: ReactNode;
    default:<div>Loading More...</div>
    description: This component is rendered while more data is loading

#### errorComponent

    type: ReactNode;
    default:<div>Loading failed, please try again later</div>
    description: Component rendered when there is an error during loading

#### noMoreComponent

    type: ReactNode;
    default:<div>No More Data</div>
    description: Component rendered when there is no more data

#### initialErrorComponent

    type: ReactNode;
    default:<div>Loading failed, please try again later</div>
    description: Component rendered when there is an error during initial loading

## Example

```tsx
import { ListFlow } from "listflow-react";
import "listflow-react/index.css";
interface User {
  id: number;
  name: string;
  bio: string;
}
let count = 0;
const networkError = false;
const isEmpty = false;
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
          data: [
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
          ],
        });
      }, 1000);
    });
  };

  return (
    <div className="w-[50%]">
      <div>Users page</div>
      <ListFlow<User>
        request={request}
        renderItem={(item) => (
          <div style={{ backgroundColor: "#fff", borderRadius: "6px", padding: "16px" }}>
            <div>{item.name}</div>
            <div>{item.bio}</div>
          </div>
        )}
      />
    </div>
  );
};

export default Demo;
```
