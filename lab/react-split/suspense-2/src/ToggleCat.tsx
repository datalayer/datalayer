import axios from "axios";
import * as React from "react";

const Spinner = () => (
  <div
    style={{
      ...catStyle,
      textAlign: "left",
      fontSize: "1em"
    }}
  >
    ... Loading ...
  </div>
);

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// when button is pressed, sleep and import run concurrently
const Cat = React.lazy(async () => {
  const [moduleExports] = await Promise.all([
    import("./Cat"),
    sleep(4000) // simulate that react needs 4s to import and first render
  ]);
  return moduleExports;
});

const catsContainerStyle = {
  gridArea: "cats",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap" as "wrap",
  fontSize: "2em"
};

const catStyle = {
  width: "400px",
  height: "400px",
  objectFit: "contain" as "contain",
  padding: "20px"
};

const layoutStyle = {
  display: "grid",
  gridTemplateAreas: `"button"
    "cats"`,
  gridGap: "10px"
};

interface Category {
  id: number;
  name: string;
}

interface Cat {
  breeds: [];
  categories: Record<number, Category>;
  url: string;
  width: number;
  height: number;
  id: string;
}

export const ToggleCat = () => {
  const [cats, setCats] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?&limit=80")
      .then(response => {
        setCats(response.data);
      });
  }, []);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div style={layoutStyle}>
      <button
        style={{ gridArea: "button", fontSize: "4em" }}
        onClick={toggleIsActive}
      >
        Show all the cats!
      </button>
      <div style={catsContainerStyle}>
        {isActive &&
          cats.map((cat: Cat) => (
            <React.Suspense key={cat.id} fallback={<Spinner />}>
              <Cat
                style={catStyle}
                imageUrl={cat.url}
                altText={"... a cat ..."}
              />
            </React.Suspense>
          ))}
      </div>
    </div>
  );
};
