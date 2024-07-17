let ageHistory = JSON.parse(localStorage.getItem('ageHistory')) || [];

updateAgeHistory();

document.getElementById('age-form').addEventListener('submit', 
    function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let dob = new Date(document.getElementById('dob').value);
        let today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        let monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()))
            {
                age--;
            }

            document.getElementById('result').textContent = 'Your age is: ' + age + ' years old.';

            ageHistory.push({ name, age });

            localStorage.setItem('ageHistory', JSON.stringify(ageHistory))

            updateAgeHistory();
    });

    document.getElementById('remove-age').addEventListener('click', () => {
        ageHistory.pop();

        localStorage.setItem('ageHistory', JSON.stringify(ageHistory));

        updateAgeHistory();
    });
    
    function updateAgeHistory() {
        let ageHistoryList = document.getElementById('age-history');
        ageHistoryList.innerHTML = '';

        ageHistory.forEach((person) => {
            let listItem = document.createElement('li');
            listItem.textContent = `${person.name} is ${person.age} years old.`;
            ageHistoryList.appendChild(listItem);
        })
    }