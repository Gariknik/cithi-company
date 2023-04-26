const sendPostRequestAddOrders = async (url = '', data, setIsLoading) => {
    try {
        setIsLoading(true);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const responseData = await response.json();
        console.log(responseData)
        if (responseData || responseData.success) {
            return true
        }
        setIsLoading(false);
        throw new Error(responseData.error || 'Something went wrong');
    } catch (error) {
        return error;
    }
};

const registerUser = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === "ok") {
            return responseData;
        }
        throw new Error(responseData.error || 'Something went wrong');

    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Something went wrong');
    }
};

const loginUser = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === "ok") {
            return responseData;
        }
        throw new Error(responseData.error || 'Something went wrong');

    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Something went wrong');
    }
};


const getUserOrders = async (url = '') => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return null;
    }
};

const deleteOrder = async (url='') => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok) {
            return
        } else {
            throw new Error('Failed to delete record.');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to delete record.');
    }
};


const getPassword = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === "ok") {
            return true
        }
        throw new Error(responseData.error || 'Something went wrong');

    } catch (error) {
        console.error(error);

    }
};

const LogOut = async (url = '') => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const res = await response.json();
        return res;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return null;
    }
};

export { sendPostRequestAddOrders, loginUser, registerUser, getUserOrders, deleteOrder,  getPassword, LogOut};

