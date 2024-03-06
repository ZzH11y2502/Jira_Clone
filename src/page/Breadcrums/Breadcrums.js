import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="my-4">
      <p>
        {paths.map((path, index) => (
          <span key={index}>
            {index < paths.length - 1 ? (
              <Link to={path.url}>{path.label}/</Link>
            ) : (
              path.label
            )}
          </span>
        ))}
      </p>
    </nav>
  );
};

export default Breadcrumb;
