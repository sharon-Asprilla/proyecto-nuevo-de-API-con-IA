document.addEventListener('DOMContentLoaded', () => {
    const loadDataButton = document.getElementById('load-data');
    const resultsDiv = document.getElementById('results');
    const apiUrlInput = document.getElementById('api-url');
    const copyUrlButton = document.getElementById('copy-url');

    const API_URL = 'http://localhost:3000/api/users';
    apiUrlInput.value = API_URL;

    const fetchData = async () => {
        resultsDiv.innerHTML = '<p class="loading">Cargando...</p>';

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            resultsDiv.innerHTML = '';

            data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('item');

                userDiv.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>City:</strong> ${user.city}</p>
                `;

                resultsDiv.appendChild(userDiv);
            });

        } catch (error) {
            resultsDiv.innerHTML = '<p class="error">No se pudieron cargar los datos. Intenta más tarde.</p>';
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    loadDataButton.addEventListener('click', fetchData);

    copyUrlButton.addEventListener('click', () => {
        apiUrlInput.select();
        document.execCommand('copy');
        alert('API URL copied to clipboard!');
    });
});
