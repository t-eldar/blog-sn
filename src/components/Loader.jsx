import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<Spinner animation="border" role="status" style={{ height: "100px", width: "100px" }}>
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	);
}

export default Loader;