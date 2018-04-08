import React from 'react';
import PropTypes from 'prop-types';

const ResourceTable = ({
	header,
	displayFields,
	dataSource,
	listItemClick,
	deleteActionClick
}) => {
	return (
		<table className="table table-striped table-hover table-bordered">
			<thead>
				<tr>
					{header.map(name => (
						<th key={name} scope="col">
							{name}
						</th>
					))}
					{deleteActionClick && (
						<th className="no-print" scope="col">
							Acciones
						</th>
					)}
				</tr>
			</thead>
			<tbody>
				{dataSource.map(resource => (
					<ResourceTableRow
						key={resource._id}
						resource={resource}
						displayFields={displayFields}
						listItemClick={listItemClick}
						deleteActionClick={deleteActionClick}
					/>
				))}
			</tbody>
		</table>
	);
};

ResourceTable.propTypes = {
	dataSource: PropTypes.array
};

ResourceTable.defaultProps = {
	dataSource: []
};

const ResourceTableRow = ({
	resource,
	displayFields,
	listItemClick,
	deleteActionClick
}) => {
	return (
		<tr>
			<th scope="row">
				<a className="btn btn-info" onClick={() => listItemClick(resource._id)}>
					{resource._id.substr(-4)}
				</a>
			</th>
			{displayFields.map(field => <td key={field}>{resource[field]}</td>)}
			{deleteActionClick && (
				<td className="no-print">
					<button
						className="btn btn-warning"
						onClick={() => deleteActionClick(resource._id)}
					>
						Eliminar
					</button>
				</td>
			)}
		</tr>
	);
};

export default ResourceTable;
