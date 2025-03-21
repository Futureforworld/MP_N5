async function login(username, password) {
    const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("jwt_token", data.jwt_token);
        console.log("Login bem-sucedido!");
    } else {
        console.error("Erro de login:", data.message);
    }
}

async function doSomeAction() {
    const token = localStorage.getItem("jwt_token");
    if (!token) return console.error("Usuário não autenticado!");

    const response = await fetch("http://localhost:3000/do_SomeAction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    console.log(data);
}

// Exemplo de uso:
// login("admin", "adminpassword").then(() => doSomeAction());
