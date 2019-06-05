import { mountJobBoard, getFilterNodes, getFilterTitle } from "./page";

describe("Specifying a header title", () => {
  const filters = [
    {
      key: "type",
      title: "Jobtyp"
    }
  ];

  test("should render the correct filter title", () => {
    const board = mountJobBoard({ filters });

    const filterNodes = getFilterNodes(board);
    const title = getFilterTitle(filterNodes[0]);

    expect(title).toEqual(filters[0].title);
  });
});
