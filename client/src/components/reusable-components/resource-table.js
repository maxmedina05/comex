import React from 'react';
import PropTypes from 'prop-types';

let rowCount = 1;

function renderLabel(field) {
	if (typeof field === 'object') {
		return field.label;
	}

	return field;
}

function renderValue(field, resource) {
	if (field === '#') return rowCount++;

	if (typeof field === 'object') {
		if (typeof field.value === 'function') {
			return field.value(resource);
		}

		return resource[field.value];
	}

	return resource[field];
}

const ResourceRow = ({
	fields,
	resource,
	handleShowClick,
	handleDeleteClick
}) => {
	return (
		<tr>
			{fields.map((field, index) => (
				<td key={index}>{renderValue(field, resource)}</td>
			))}
			<td>
				{handleShowClick && (
					<button
						className="btn btn-warning"
						onClick={() => handleShowClick(resource)}
					>
						Ver
					</button>
				)}
				{handleDeleteClick && (
					<button className="btn btn-danger">Eliminar</button>
				)}
			</td>
		</tr>
	);
};

const ResourceTable = ({
	className,
	fields,
	dataSource,
	handleShowClick,
	handleDeleteClick
}) => {
	const showActions = handleShowClick || handleDeleteClick;
	return (
		<table className={className}>
			<thead>
				<tr>
					{fields.map((field, index) => (
						<th key={index}>{renderLabel(field)}</th>
					))}
					{showActions && <th>Acciones</th>}
				</tr>
			</thead>
			<tbody>
				{dataSource.map((item, index) => (
					<ResourceRow
						key={index}
						resource={item}
						fields={fields}
						handleShowClick={handleShowClick}
						handleDeleteClick={handleDeleteClick}
					/>
				))}
			</tbody>
		</table>
	);
};

ResourceTable.propTypes = {
	dataSource: PropTypes.array.isRequired
};

ResourceTable.defaultProps = {
	dataSource: []
};

export default ResourceTable;
