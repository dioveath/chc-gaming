import React, { useState } from "react";
import PropTypes from "prop-types";

export const TabItem = (props) => {
  return <div {...props} />;
};

TabItem.propTypes = {
  name: PropTypes.string,
  element: PropTypes.element,
};

export default function Tab({ children, initTab, onChange }) {
  let headers = {};
  React.Children.forEach(children, (el) => {
    if (!React.isValidElement(el)) return;
    const { name, icon, element } = el.props;
    headers[name.toLowerCase()] = { name, icon, element };
  });

  let initActive = initTab ? initTab : (Object.keys(headers).length === 0 ? "" : Object.keys(headers)[0]);
  const [activeTab, setActiveTab] = useState(initActive);

  if (headers === {}) {
    console.error("Tab children is empty!");
    return <></>;
  }

  return (
    <>
      <div className="text-white mt-4">
        <ul className="flex gap-4 font-semibold relative">
          <div className="absolute bottom-0 w-full mt-2 h-[1px] bg-gray-700"></div>
          {Object.entries(headers).map(([key, value]) => (
            <li
              key={key}
              className={`flex items-center cursor-pointer pb-1 px-4 border-b-4 ${
                activeTab === key ? "border-red-500" : "border-transparent"
              }`}
              onClick={(e) => {
                setActiveTab(value.name.toLowerCase());
                onChange(value.name.toLowerCase());                
              }}
            >
              {value.icon && value.icon}
              {value.name}
            </li>
          ))}
        </ul>
      </div>
      {headers[activeTab]?.element}
    </>
  );
}

Tab.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];
    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== TabItem) {
        error = new Error(
          "`" + componentName + "` children should be type of 'TabItem'"
        );
      }
    });
    return error;
  },
};
