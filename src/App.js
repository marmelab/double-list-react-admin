import fakeDataProvider from "ra-data-fakerest";
import { Admin, Resource } from "react-admin";
import { v4 as uuidv4 } from "uuid";
import { ProgrammingList } from "./programmings";

const dataProvider = fakeDataProvider(
  {
    programmings: [
      { id: uuidv4(), index: 0, title: "Harry Potter 1" },
      { id: uuidv4(), index: 1, title: "Harry Potter 2" },
      { id: uuidv4(), index: 2, title: "Harry Potter 3" },
    ],
    teasers: [
      {
        id: uuidv4(),
        index: 0,
        title: "Harry Potter 4",
        description: "Harry potter film",
      },
      {
        id: uuidv4(),
        index: 1,
        title: "Harry Potter 5",
        description: "Harry potter film",
      },
      {
        id: uuidv4(),
        index: 2,
        title: "Harry Potter 6",
        description: "Harry potter film",
      },
      {
        id: uuidv4(),
        index: 3,
        title: "Harry Potter 7",
        description: "Harry potter film",
      },
      {
        id: uuidv4(),
        index: 4,
        title: "Star wars 1",
        description: "Star wars film",
      },
      {
        id: uuidv4(),
        index: 5,
        title: "Star wars 2",
        description: "Star wars film",
      },
    ],
  },
  true
);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="programmings" list={ProgrammingList} />
      <Resource name="teasers" />
    </Admin>
  );
}

export default App;
