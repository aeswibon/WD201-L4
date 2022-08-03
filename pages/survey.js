const ageValidate = () => {
	const dob = document.getElementById("dob");
	const date = new Date(dob.value);
	const minValidDob = new Date();
	const maxValidDob = new Date();

	minValidDob.setFullYear(minValidDob.getFullYear() - 55);
	maxValidDob.setFullYear(maxValidDob.getFullYear() - 18);
	dob.setAttribute(
		"min",
		`${minValidDob.getFullYear()}-${String(minValidDob.getMonth()).padStart(
			2,
			"0",
		)}-${String(minValidDob.getDate()).padStart(2, "0")}`,
	);
	dob.setAttribute(
		"max",
		`${maxValidDob.getFullYear()}-${String(maxValidDob.getMonth()).padStart(
			2,
			"0",
		)}-${String(maxValidDob.getDate()).padStart(2, "0")}`,
	);
	if (
		minValidDob.getTime() <= date.getTime() &&
		date.getTime() <= maxValidDob.getTime()
	) {
		return true;
	} else if (minValidDob.getTime() > date.getTime()) {
		alert("Age cannot be more than 55 years.");
		return false;
	} else {
		alert("Age cannot be less than 18 years.");
		return false;
	}
};

let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
	userEntries = JSON.parse(userEntries);
} else {
	userEntries = [];
}

const displayEntries = () => {
	const savedUserEntries = localStorage.getItem("user-entries");
	let entries = "";
	if (savedUserEntries) {
		const parsedUserEntries = JSON.parse(savedUserEntries);
		entries = parsedUserEntries
			.map((entry) => {
				const name = `<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${entry.name}</td>`;
				const email = `<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${entry.email}</td>`;
				const password = `<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${entry.password}</td>`;
				const dob = `<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${entry.dob}</td>`;
				const acceptTerms = `<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">${entry.acceptTermsAndConditions}</td>`;
				const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
				return row;
			})
			.join("\n");
	}
	const table = `
    <table class="min-w-full leading-normal">
        <thead>
            <tr>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Password
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date of Birth
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Accepted Terms
                </th>
            </tr>
        </thead>
        <tbody>
           ${entries}
        </tbody>
    </table>
    `;
	const details = document.getElementById("user-entries");
	details.innerHTML = table;
};

const saveUserForm = (event) => {
	event.preventDefault();
	if (!ageValidate()) {
		return;
	}
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const dob = document.getElementById("dob").value;
	const acceptTermsAndConditions =
		document.getElementById("acceptTerms").checked;
	const userDetails = {
		name,
		email,
		password,
		dob,
		acceptTermsAndConditions,
	};
	userEntries.push(userDetails);
	localStorage.setItem("user-entries", JSON.stringify(userEntries));
	displayEntries();
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();
