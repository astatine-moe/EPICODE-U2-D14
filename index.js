const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjc2ZmQ0YmUzZDAwMTU4NDYwMTQiLCJpYXQiOjE2NjgwODU2MTUsImV4cCI6MTY2OTI5NTIxNX0.kb8Xdym3g7w_VaHUzUWEl2EUqrVgOn9acXC5vZbUAiM`;
const opts = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const uri = `https://striveschool-api.herokuapp.com/api/product/`;

const request = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url, { ...opts })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    ...opts.headers,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    ...opts.headers,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
    delete: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                ...opts,
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(resolve)
                .catch(reject);
        });
    },
};
