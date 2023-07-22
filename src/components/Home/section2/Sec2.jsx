"use client";

import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { useState } from "react";
import "./index.css";

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const pluginWrapper = () => {
  // ...
};

const originalColors = [
  "#ff5f45",
  "#0798ec",
  "#fc6c7c",
  "#435b71",
  "orange",
  "blue",
  "purple",
  "yellow",
];

const Sec2 = () => {
  const [sectionsColor, setSectionsColor] = useState([...originalColors]);
  const [fullpages] = useState([
    {
      text: "Section 1",
    },
    {
      text: "Section 2",
    },
    {
      text: "Section 3",
    },
  ]);

  const onLeave = (origin, destination, direction) => {
    console.log("onLeave", { origin, destination, direction });
  };

  const Menu = () => (
    <div
      className="menu"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}
    ></div>
  );

  if (!fullpages.length) {
    return null;
  }

  return (
    <div>
      <div className="App">
        <Menu />
        <ReactFullpage
          debug
          pluginWrapper={pluginWrapper}
          licenseKey={"YOUR_KEY_HERE"}
          navigation
          anchors={["firstPage", "secondPage", "thirdPage"]}
          sectionSelector={SECTION_SEL}
          onLeave={onLeave}
          controlArrows={false}
          // scrollBar={false}
          sectionsColor={sectionsColor}
          render={(comp) => (
            <ReactFullpage.Wrapper>
              {fullpages.map(({ text }) => (
                <div key={text} className={SEL}>
                  <div className="slide">
                    <h3>{text}</h3>
                  </div>
                  <div className="slide">
                    <h3>{text}</h3>
                  </div>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
    </div>
  );
};

export default Sec2;
