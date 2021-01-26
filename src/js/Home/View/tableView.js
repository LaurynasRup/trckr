import { DOMs, strings, tableClasses } from '../base';

export const insertTable = (obj, name) => {
	if (obj.teams.length > 0) {
		// Clear spinner
		DOMs.tableContainer.innerHTML = '';
		// Create an html table
		const table = document.createElement('table');
		// Create a class name
		const tableClass = `league-table ${name}`;
		table.className = tableClass;
		// console.log(table);
		// Insert headings
		table.insertAdjacentHTML('beforeend', strings.tableHead);
		// Insert Each team
		generateTbody(obj.teams, table);
		// Insert table
		DOMs.tableContainer.appendChild(table);
		// Insert title
		DOMs.tableTitle.innerText = obj.name;
	}
};

const generateTbody = (arr, table) => {
	if (arr && arr.length > 0) {
		arr.forEach((item) => {
			// Create new row for each item
			const newRow = table.insertRow();
			newRow.classList.add('team-row');
		});
		// Grab all rows
		const rows = table.children[0].children;
		// Insert cells with classes to rows
		rows.forEach((row) => {
			if (!row.classList.contains('headings-row')) {
				for (let i = 0; i <= 10; i++) {
					const newCell = row.insertCell();
					newCell.classList.add(tableClasses[i]);
				}
			}
		});
		// console.log(arr[0]);
		// Populate cells with data
		arr.forEach((item, index) => {
			const eachRowChildren = rows[index + 1].children;
			eachRowChildren.forEach((child) => {
				const innerData = child.className;
				if (innerData !== 'form') {
					child.innerHTML = item[innerData];
				} else {
					if (item[innerData]) {
						const formHtml = item[innerData]
							.reverse()
							.map((el) => {
								if (el === 'W') {
									return strings.winDiv;
								} else if (el === 'D') {
									return strings.drawDiv;
								} else {
									return strings.loseDiv;
								}
							})
							.join('');
						child.innerHTML = formHtml;
					}
				}
			});
		});
	}
};
